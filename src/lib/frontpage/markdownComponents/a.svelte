<script lang="ts">
  export let href: string = ''
  export let title: string
</script>

<a class="font-bold no-underline" {href} {title}><slot /></a>
