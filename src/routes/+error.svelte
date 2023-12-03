<script lang='ts'>
  import { page } from '$app/stores'
  import { redirect } from '@sveltejs/kit'

  if ($page.status === 404) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw redirect(307, '/')
  }
</script>
