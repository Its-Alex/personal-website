import type { Component } from 'svelte'
import { error } from '@sveltejs/kit'

import type { PageLoadEvent } from './$types.d.ts'

import type { ArticleMetadata } from '$lib/types/articles'

export async function load({ params }: PageLoadEvent): Promise<
  | {
      content: Component
      meta: ArticleMetadata
    }
  | undefined
> {
  try {
    const article = await import(`../articles/${params.slug.replaceAll('/', '_')}.md`)

    return {
      content: article.default,
      meta: article.metadata
    }
  } catch (e) {
    // Vite throws "Unknown variable dynamic import" when no .md matches the glob, i.e. article missing
    if (e !== null && e instanceof Error) {
      if (e.message.includes('Unknown variable dynamic import')) {
        error(404)
      }
    }
    console.error(e)
    error(500, e !== null && e instanceof Error ? e.message : 'Internal server error')
  }
}
