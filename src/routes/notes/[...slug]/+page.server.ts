import { S3Client, S3Errors } from '@bradenmacdonald/s3-lite-client'
import { error as sveltekitError } from '@sveltejs/kit'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import { unified } from 'unified'
import type { VFile } from 'vfile'
import matter from 'gray-matter'
import { getHighlighter, rehypeShikiFromHighlighter } from '#lib/highlighter.js'

import type { PageServerLoadEvent, PageServerLoad } from './$types.js'

interface ArticleMetadata {
  public: boolean
  title: string
  date: string
}

const BUCKET_NAME = process.env.PERSONAL_WEBSITE_MINIO_BUCKET_NAME ?? ''
const ENDPOINT = process.env.PERSONAL_WEBSITE_MINIO_ENDPOINT ?? ''
const ACCESS_KEY = process.env.PERSONAL_WEBSITE_MINIO_ACCESS_KEY ?? ''
const SECRET_KEY = process.env.PERSONAL_WEBSITE_MINIO_SECRET_KEY ?? ''
const PORT = process.env.PERSONAL_WEBSITE_MINIO_PORT
const USE_SSL = process.env.PERSONAL_WEBSITE_MINIO_USE_SSL === 'true'

const s3Client =
  ENDPOINT !== '' && BUCKET_NAME !== '' && ACCESS_KEY !== '' && SECRET_KEY !== ''
    ? new S3Client({
        endPoint: `${USE_SSL ? 'https' : 'http'}://${ENDPOINT}${PORT ? `:${PORT}` : ''}`,
        accessKey: ACCESS_KEY,
        secretKey: SECRET_KEY,
        region: process.env.PERSONAL_WEBSITE_MINIO_REGION || 'us-east-1',
        pathStyle: true
      })
    : null

export const load: PageServerLoad = async ({ params, url }: PageServerLoadEvent) => {
  if (s3Client === null) {
    console.log('s3Client is null')
    sveltekitError(404)
  }

  const objectName = Array.isArray(params.slug) ? params.slug.join('/') : (params.slug ?? '')
  let data = ''

  try {
    const response = await s3Client.getObject(`${objectName}.md`, {
      bucketName: BUCKET_NAME
    })
    data = await response.text()
  } catch (error) {
    if (error instanceof S3Errors.ServerError && error.statusCode === 404) {
      sveltekitError(404)
    }
    console.error('Error fetching file from S3', error)
    sveltekitError(500, error instanceof Error ? error.message : 'Internal server error')
  }

  const { data: meta, content } = matter(data)

  if (typeof meta.public !== 'boolean' || !meta.public) {
    sveltekitError(404)
  }

  // Remove password from meta before returning
  const { password, ...metaWithoutPassword } = meta
  // Check password if required
  const passwordString = typeof password === 'number' ? password.toString() : password
  if (typeof passwordString === 'string' && passwordString !== '') {
    const urlPassword = url.searchParams.get('password')
    if (urlPassword !== passwordString) {
      console.log(`Password required or incorrect for protected note ${objectName}`)
      sveltekitError(404)
    }
  }

  let processedContent: VFile
  try {
    processedContent = await unified()
      .use(remarkParse)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeSlug)
      .use(rehypeShikiFromHighlighter, await getHighlighter(), {
        inline: 'tailing-curly-colon',
        theme: 'dracula',
        lazy: true,
        fallbackLanguage: 'text'
      })
      .use(rehypeStringify)
      .process(content)
  } catch (error) {
    console.error('Error processing content', error)
    sveltekitError(
      500,
      error !== null && error instanceof Error ? error.message : 'Internal server error'
    )
  }

  const htmlContent = processedContent.value

  return {
    content: htmlContent as string,
    meta: metaWithoutPassword as ArticleMetadata
  }
}
