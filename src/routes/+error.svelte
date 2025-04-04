<script lang="ts">
  import { redirect } from '@sveltejs/kit'

  import { page } from '$app/state'

  if (page.status === 404) {
    redirect(307, '/')
  }
</script>
