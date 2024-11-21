<script lang="ts">
  import type { PageServerData } from './$types'

  import { locale } from '$lib/translations'

  export let data: PageServerData
</script>

<div>
  <navbar>
    <h1 class="my-20 text-2xl font-bold">Blog</h1>
  </navbar>

  <section>
    <ul class="mx-auto grid grid-cols-1 gap-4">
      {#each data.articles as article}
        <li>
          <span class="m-0 mb-2 p-0 font-light"
            >{new Intl.DateTimeFormat($locale ?? undefined).format(article.publishDate)}</span
          >
          <span> - </span>
          <a href={article.slug}>{article.title}</a>
        </li>
      {/each}
    </ul>
  </section>
</div>
