import type { ArticleMetadata } from '$lib/types/articles'

export async function load(): Promise<{
  articles: ArticleMetadata[]
}> {
  let articles: ArticleMetadata[] = []

  const paths = import.meta.glob('/src/routes/blog/articles/**/*.md', { eager: true })

  for (const path in paths) {
    const file = paths[path]
    const slug = `${path.split('/').at(-1)?.replace('.md', '').replaceAll('_', '/')}`

    if (
      typeof slug === 'string' &&
      file !== undefined &&
      file !== null &&
      typeof file === 'object' &&
      'metadata' in file &&
      file.metadata !== null &&
      typeof file.metadata === 'object' &&
      'publishDate' in file.metadata &&
      typeof file.metadata.publishDate === 'string' &&
      'lastUpdateDate' in file.metadata &&
      typeof file.metadata.lastUpdateDate === 'string' &&
      'title' in file.metadata &&
      typeof file.metadata.title === 'string' &&
      'description' in file.metadata &&
      typeof file.metadata.description === 'string' &&
      'published' in file.metadata &&
      typeof file.metadata.published === 'boolean'
    ) {
      const article: ArticleMetadata = {
        title: file.metadata.title,
        description: file.metadata.description,
        published: file.metadata.published,
        slug,
        publishDate: new Date(file.metadata.publishDate),
        lastUpdateDate: new Date(file.metadata.lastUpdateDate)
      }

      if (article.published) {
        articles.push(article)
      }
    }
  }

  articles = articles.sort(
    (first, second) => second.publishDate.getTime() - first.publishDate.getTime()
  )

  return {
    articles
  }
}
