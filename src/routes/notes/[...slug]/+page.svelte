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

<div class="prose mx-auto w-1/2 max-w-none p-2">
  <navbar>
    {#if data?.meta?.title}
      <h1 class="text-5xl font-bold">{data?.meta?.title}</h1>
    {/if}
  </navbar>
  <article>
    {@html typeof data?.content === 'string' ? data.content : ''}
  </article>
  <footer>
    <p class="text-center text-sm text-gray-500">
      Found an error? Report it to <a href="mailto:contact@itsalex.fr">contact@itsalex.fr</a>
    </p>
  </footer>
</div>
