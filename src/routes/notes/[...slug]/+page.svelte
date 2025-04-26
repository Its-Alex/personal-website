<script lang="ts">
  /* eslint-disable svelte/no-at-html-tags */
  interface Props {
    data: {
      content: string
      meta: {
        title: string
      }
    }
  }

  const { data }: Props = $props()
</script>

<div class="mx-auto w-1/2 p-4">
  <navbar>
    {#if data?.meta?.title}
      <h1 class="pb-4 text-4xl font-bold">{data?.meta?.title}</h1>
    {/if}
  </navbar>
  <article class="prose bg-red max-w-none pb-4">
    {@html typeof data?.content === 'string' ? data.content : ''}
  </article>
  <footer>
    <p class="text-center text-sm text-gray-500">
      © {new Date().getFullYear()} ItsAlex. All rights reserved. Contact:
      <a href="mailto:contact@itsalex.fr" class="underline">contact@itsalex.fr</a>
    </p>
  </footer>
</div>
