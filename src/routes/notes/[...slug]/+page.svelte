<script lang="ts">
  /* eslint-disable svelte/no-at-html-tags */
  interface Props {
    data: {
      content: string
      meta: {
        public: boolean
        title: string
        date: string
      }
    }
  }

  const { data }: Props = $props()
</script>

<div class="mx-auto w-1/2">
  <navbar>
    <h1 class="my-10 text-2xl font-bold">{data?.meta?.title}</h1>
  </navbar>
  <div class="prose max-w-none">
    {@html typeof data?.content === 'string' ? data.content : ''}
  </div>
</div>
