<script lang="ts">
  import '../app.css'
  import type { Snippet } from 'svelte'

  import type { LayoutData } from './$types'
  import { use } from '#lib/translations/index.js'

  interface Props {
    data: LayoutData
    children?: Snippet
  }

  const { data, children }: Props = $props()

  use(() => data)
</script>

{@render children?.()}
