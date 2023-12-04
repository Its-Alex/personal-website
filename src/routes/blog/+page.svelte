<script lang="ts">
  import { locale } from 'svelte-i18n'

  import type { PageServerData } from './$types'

  export let data: PageServerData
</script>

<div class="py-24 sm:py-32">
  <div class="mx-auto max-w-7xl px-6 lg:px-8">
    <header>
      <div class="mx-auto max-w-2xl lg:mx-0">
        <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Blog</h2>
        <p class="mt-2 text-lg leading-8 text-gray-600">All my articles.</p>
      </div>
    </header>

    <section>
      <ul class="grid grid-cols-1 gap-4">
        {#each data.articles as article}
          <li class="grid grid-cols-1 gap-1 rounded border p-2 shadow">
            <span>{new Intl.DateTimeFormat($locale ?? undefined).format(article.publishDate)}</span>
            <a href={article.slug}>{article.title}</a>
            <p>{article.description}</p>
          </li>
        {/each}
      </ul>
    </section>
  </div>
</div>
