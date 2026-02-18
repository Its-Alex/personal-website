<script lang="ts">
  import { resolve } from '$app/paths'
  import type { PageServerData } from './$types'
  import { locale } from '$lib/translations'

  interface Props {
    data: PageServerData
  }

  const { data }: Props = $props()
</script>

<div class="py-12">
  <header class="mb-10 border-b border-gray-200 pb-8">
    <h1 class="font-serif text-3xl font-bold tracking-tight text-gray-900">Writing</h1>
    {#if data.articles.length > 0}
      <p class="mt-2 text-sm text-gray-400">
        {data.articles.length} article{data.articles.length > 1 ? 's' : ''}
      </p>
    {/if}
  </header>

  {#if data.articles.length > 0}
    <div class="divide-y divide-gray-200">
      {#each data.articles as article (article.slug)}
        <article class="group relative py-8 first:pt-0">
          <time
            class="mb-1 block text-xs font-semibold tracking-widest text-gray-500 uppercase"
            datetime={new Date(article.publishDate).toISOString()}
          >
            {new Intl.DateTimeFormat($locale ?? undefined, {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }).format(new Date(article.publishDate))}
          </time>

          <h2 class="mb-2 flex items-center gap-2 text-xl font-bold text-gray-950">
            <a
              class="no-underline before:absolute before:-inset-x-2 before:-inset-y-4 before:z-10"
              href={resolve('/blog/[...slug]', { slug: article.slug })}
            >
              {article.title}
            </a>
          </h2>

          {#if article.description}
            <p class="line-clamp-2 text-sm leading-relaxed text-gray-600">
              {article.description}
            </p>
          {/if}
        </article>
      {/each}
    </div>
  {:else}
    <p class="py-16 text-center text-sm text-gray-400 italic">Nothing here yet.</p>
  {/if}
</div>
