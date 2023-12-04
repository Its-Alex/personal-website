import type { ComponentType } from 'svelte'
import { redirect, error } from '@sveltejs/kit'

import type { PageLoadEvent } from './$types.d.ts'

import type { ArticleMetadata } from '$lib/types/articles'

export async function load({ params }: PageLoadEvent): Promise<
  | {
      content: ComponentType
      meta: ArticleMetadata
    }
  | undefined
> {
  try {
    console.log(params.slug)
    const article = await import(`../articles/${params.slug.replaceAll('/', '_')}.md`)

    return {
      content: article.default,
      meta: article.metadata
    }
  } catch (e) {
    console.log(e)
    // Redirect if page not found
    if (e !== null && e instanceof Error) {
      if (e.message.includes('Unknown variable dynamic import')) {
        redirect(307, '/')
      }
    }
    console.error(e)
    error(500, e !== null && e instanceof Error ? e.message : 'Internal server error')
  }
}
