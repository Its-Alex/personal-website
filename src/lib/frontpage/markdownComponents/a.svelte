<script lang="ts">
  export let href: string = ''
  export let title: string
</script>

<a
  class="font-bold underline decoration-2 underline-offset-2 visited:text-gray-700 hover:text-gray-700"
  {href}
  {title}><slot /></a
>
