import type { Readable } from 'node:stream'

import { redirect, error as sveltekitError } from '@sveltejs/kit'
import { Client } from 'minio'
import rehypeSanitize from 'rehype-sanitize'
import rehypeShiki from '@shikijs/rehype'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'
import type { VFile } from 'vfile'
import matter from 'gray-matter'

import type { PageServerLoadEvent, PageServerLoad } from './$types.js'

interface ArticleMetadata {
  public: boolean
  title: string
  date: string
}

const BUCKET_NAME = process.env.MINIO_BUCKET_NAME ?? ''

const minioClient =
  typeof process.env.MINIO_ENDPOINT === 'string' &&
  process.env.MINIO_ENDPOINT !== '' &&
  typeof BUCKET_NAME === 'string' &&
  BUCKET_NAME !== '' &&
  typeof process.env.MINIO_ACCESS_KEY === 'string' &&
  process.env.MINIO_ACCESS_KEY !== '' &&
  typeof process.env.MINIO_SECRET_KEY === 'string' &&
  process.env.MINIO_SECRET_KEY !== ''
    ? new Client({
        endPoint: process.env.MINIO_ENDPOINT ?? '',
        port: Number(process.env.MINIO_PORT) ?? 443,
        useSSL:
          typeof process.env.MINIO_USE_SSL === 'string' && process.env.MINIO_USE_SSL === 'true',
        accessKey: process.env.MINIO_ACCESS_KEY ?? '',
        secretKey: process.env.MINIO_SECRET_KEY ?? '',
        pathStyle: true,
        region: process.env.MINIO_REGION ?? ''
      })
    : null

export const load: PageServerLoad = async ({ params }: PageServerLoadEvent) => {
  if (minioClient === null) {
    console.log('minioClient is null')
    redirect(307, '/')
  }

  const objectName = Array.isArray(params?.slug)
    ? params?.slug.join('/')
    : typeof params?.slug === 'string'
      ? params?.slug
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

  if (typeof meta?.public !== 'boolean' || !meta?.public) {
    redirect(307, '/')
  }

  let processedContent: VFile
  try {
    processedContent = await unified()
      .use(remarkParse)
      .use(remarkRehype)
      .use(rehypeSanitize)
      .use(rehypeShiki, {
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
