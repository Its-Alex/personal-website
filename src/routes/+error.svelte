<script lang="ts">
  import { redirect } from '@sveltejs/kit'

  import { page } from '$app/stores'

  if ($page.status === 404) {
    redirect(307, '/')
  }
</script>
