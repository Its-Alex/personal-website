import type { ServerLoad } from '@sveltejs/kit'
import { redirect } from '@sveltejs/kit'

export const load: ServerLoad = ({ locals }) => {
  throw redirect(307, `/${locals.locale}/`)
}
