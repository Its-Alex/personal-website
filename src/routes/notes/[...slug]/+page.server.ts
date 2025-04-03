import type { Readable } from 'node:stream'

import { redirect, error as sveltekitError } from '@sveltejs/kit'
import { Client } from 'minio'
import rehypeSanitize from 'rehype-sanitize'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import { unified } from 'unified'
import type { VFile } from 'vfile'
import matter from 'gray-matter'
import { createHighlighterCore, type HighlighterGeneric } from 'shiki/core'
import { createOnigurumaEngine } from 'shiki/engine/oniguruma'
import rehypeShikiFromHighlighter from '@shikijs/rehype/core'

import type { PageServerLoadEvent, PageServerLoad } from './$types.js'

interface ArticleMetadata {
  public: boolean
  title: string
  date: string
}

const BUCKET_NAME = process.env.PERSONAL_WEBSITE_MINIO_BUCKET_NAME ?? ''

const minioClient =
  typeof process.env.PERSONAL_WEBSITE_MINIO_ENDPOINT === 'string' &&
  process.env.PERSONAL_WEBSITE_MINIO_ENDPOINT !== '' &&
  typeof BUCKET_NAME === 'string' &&
  BUCKET_NAME !== '' &&
  typeof process.env.PERSONAL_WEBSITE_MINIO_ACCESS_KEY === 'string' &&
  process.env.PERSONAL_WEBSITE_MINIO_ACCESS_KEY !== '' &&
  typeof process.env.PERSONAL_WEBSITE_MINIO_SECRET_KEY === 'string' &&
  process.env.PERSONAL_WEBSITE_MINIO_SECRET_KEY !== ''
    ? new Client({
        endPoint: process.env.PERSONAL_WEBSITE_MINIO_ENDPOINT ?? '',
        port: Number(process.env.PERSONAL_WEBSITE_MINIO_PORT) || 443,
        useSSL:
          typeof process.env.PERSONAL_WEBSITE_MINIO_USE_SSL === 'string' &&
          process.env.PERSONAL_WEBSITE_MINIO_USE_SSL === 'true',
        accessKey: process.env.PERSONAL_WEBSITE_MINIO_ACCESS_KEY ?? '',
        secretKey: process.env.PERSONAL_WEBSITE_MINIO_SECRET_KEY ?? '',
        pathStyle: true,
        region: process.env.PERSONAL_WEBSITE_MINIO_REGION ?? ''
      })
    : null

const highlighter = (await createHighlighterCore({
  themes: [import('@shikijs/themes/dracula')],
  langs: [
    import('@shikijs/langs/javascript'),
    import('@shikijs/langs/typescript'),
    import('@shikijs/langs/svelte'),
    import('@shikijs/langs/terraform'),
    import('@shikijs/langs/dockerfile'),
    import('@shikijs/langs/shell'),
    import('@shikijs/langs/toml')
  ],
  engine: createOnigurumaEngine(() => import('shiki/wasm'))
})) as HighlighterGeneric<string, string>

export const load: PageServerLoad = async ({ params }: PageServerLoadEvent) => {
  if (minioClient === null) {
    console.log('minioClient is null')
    redirect(307, '/')
  }

  const objectName = Array.isArray(params.slug)
    ? params.slug.join('/')
    : typeof params.slug === 'string'
      ? params.slug
      : ''
  let data = ''

  try {
    const dataStream: Readable = await minioClient.getObject(
      BUCKET_NAME,
      typeof objectName === 'string' ? `${objectName}.md` : ''
    )
    for await (const chunk of dataStream) {
      data += chunk
    }
  } catch (error) {
    if (error !== null && error instanceof Error) {
      if (error.message.includes('The specified key does not exist')) {
        redirect(307, '/')
      }
    }
    console.error('Error fetching file from S3', error)
    sveltekitError(
      500,
      error !== null && error instanceof Error ? error.message : 'Internal server error'
    )
  }

  const { data: meta, content } = matter(data)

  if (typeof meta.public !== 'boolean' || !meta.public) {
    redirect(307, '/')
  }

  let processedContent: VFile
  try {
    processedContent = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeSlug)
      .use(rehypeShikiFromHighlighter, highlighter, {
        inline: 'tailing-curly-colon',
        theme: 'dracula'
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
    meta: meta as ArticleMetadata
  }
}
