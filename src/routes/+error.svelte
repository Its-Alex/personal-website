<script lang="ts">
  import { redirect } from '@sveltejs/kit'

  import { page } from '$app/stores'

  if ($page.status === 404) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw redirect(307, '/')
  }
</script>
