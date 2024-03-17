---
title: Why use git correctly
description: This article is about git and how to use it correctly.
publishDate: '2023-4-16'
lastUpdateDate: '2023-4-16'
published: true
---

## Svelte

Media inside the **static** _folder_ is served from `/media`.

This is a [link](google.fr) [`link`](google.fr)

![Svelte](/favicon/apple-icon-76x76.png)

```typescript
for (const path in paths) {
  const file = paths[path]
  const slug = `/blog/${path.split('/').at(-1)?.replace('.md', '')}`

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
    const article: Article = {
      title: file.metadata.title,
      description: file.metadata.description,
      published: file.metadata.published,
      slug,
      publishDate: new Date(file.metadata.publishDate),
      lastUpdateDate: new Date(file.metadata.lastUpdateDate)
    }

    article.published && articles.push(article)
  }
}
```
