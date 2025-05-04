<script lang="ts">
  import { t } from '$lib/translations'

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

<div class="mx-auto px-1 py-3 sm:w-7/8 sm:px-0 xl:w-1/2">
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
      {@html $t('common.report-note-error')}
    </p>
  </footer>
</div>
