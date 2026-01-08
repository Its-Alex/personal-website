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

<div class="mx-auto flex min-h-screen flex-col px-1 py-3 sm:w-7/8 sm:px-0 xl:w-1/2">
  <article class="prose max-w-none flex-1 py-3">
    {#if data?.meta?.title}
      <h1>{data?.meta?.title}</h1>
    {/if}
    {@html typeof data?.content === 'string' ? data.content : ''}
  </article>
  <footer>
    <p class="pt-3 text-center text-sm text-gray-500">
      {@html $t('common.report-note-error')}
    </p>
  </footer>
</div>
