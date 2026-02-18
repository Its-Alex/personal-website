<script lang="ts">
  import type { Snippet } from 'svelte'
  import { page } from '$app/state'
  import { resolve } from '$app/paths'

  interface Props {
    children?: Snippet
  }

  const { children }: Props = $props()
</script>

<div class="h-full w-full overflow-auto bg-gray-100">
  <div class="mx-auto w-1/3 p-2 max-2xl:w-2/5 max-lg:w-3/5 max-md:w-4/5 max-sm:w-full">
    <nav class="flex items-center gap-6 border-b border-gray-200 pt-6 pb-0">
      <a
        href={resolve('/')}
        class="pb-3 text-sm font-medium no-underline transition-colors"
        class:border-b-2={page.url.pathname === '/'}
        class:border-gray-900={page.url.pathname === '/'}
        class:text-gray-900={page.url.pathname === '/'}
        class:text-gray-400={page.url.pathname !== '/'}
        class:hover:text-gray-700={page.url.pathname !== '/'}
      >
        Home
      </a>
      <a
        href={resolve('/blog')}
        class="pb-3 text-sm font-medium no-underline transition-colors"
        class:border-b-2={page.url.pathname.startsWith('/blog')}
        class:border-gray-900={page.url.pathname.startsWith('/blog')}
        class:text-gray-900={page.url.pathname.startsWith('/blog')}
        class:text-gray-400={!page.url.pathname.startsWith('/blog')}
        class:hover:text-gray-700={!page.url.pathname.startsWith('/blog')}
      >
        Blog
      </a>
    </nav>
    {@render children?.()}
  </div>
</div>
