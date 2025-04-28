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

<div class="mx-auto w-1/2 py-3">
  <navbar>
    {#if data?.meta?.title}
      <h1 class="text-5xl font-bold">{data?.meta?.title}</h1>
    {/if}
  </navbar>
  <article class="prose max-w-none py-2">
    {@html typeof data?.content === 'string' ? data.content : ''}
  </article>
  <footer>
    <p class="text-center text-sm text-gray-500">
      Found an error? Report it to <a href="mailto:contact@itsalex.fr">contact@itsalex.fr</a>
    </p>
  </footer>
</div>
