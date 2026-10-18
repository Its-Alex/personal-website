import { redirect } from '@sveltejs/kit'

import type { PageServerLoad } from './$types'

export const load: PageServerLoad = async ({ parent }) => {
  const { i18n } = await parent()
  redirect(307, `/${i18n.locale}`)
}
