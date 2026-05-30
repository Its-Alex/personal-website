<script lang="ts">
  import { resolve } from '$app/paths'

  import type { PageServerData } from './$types'

  import { locale } from '$lib/translations'

  interface Props {
    data: PageServerData
  }

  const { data }: Props = $props()

  const dateFormatter = $derived(
    new Intl.DateTimeFormat($locale ?? undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    })
  )
</script>

<header class="mb-10 border-b border-gray-200 pb-6">
  <h1 class="text-3xl font-bold tracking-tight text-gray-900">Blog</h1>
  <p class="mt-2 text-sm text-gray-600">
    {data.articles.length}
    {data.articles.length > 1 ? 'articles' : 'article'}
  </p>
</header>

<section>
  {#if data.articles.length === 0}
    <p class="py-12 text-center">No articles yet.</p>
  {:else}
    <ul class="flex flex-col divide-y divide-gray-200">
      {#each data.articles as article (article.slug)}
        <li class="py-5">
          <div class="flex items-baseline justify-between gap-4">
            <h2 class="text-lg font-semibold">
              <a href={resolve('/blog/[...slug]', { slug: article.slug })}>
                {article.title}
              </a>
            </h2>
            <time
              class="shrink-0 text-xs font-light tabular-nums"
              datetime={article.publishDate.toISOString()}
            >
              {dateFormatter.format(article.publishDate)}
            </time>
          </div>
          {#if article.description}
            <p class="mt-1 line-clamp-2 text-sm">
              {article.description}
            </p>
          {/if}
        </li>
      {/each}
    </ul>
  {/if}
</section>
