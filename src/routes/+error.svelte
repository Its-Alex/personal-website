<script>
	import { page } from '$app/stores';
	import { redirect } from '@sveltejs/kit';

	if ($page.status === 404) {
		throw redirect(307, '/');
	}
</script>
