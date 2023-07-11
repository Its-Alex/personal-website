import { browser } from '$app/environment'
import { page } from '$app/stores';
// Initialize i18n
import '$lib/i18n'
import { locale, waitLocale } from 'svelte-i18n'

export const load = async () => {
  if (browser) {
    const searchParams = new URL(window.location.href).searchParams

    if (searchParams?.has('queryLanguage')) {
      locale.set(searchParams?.get('queryLanguage'))
    } else {
      searchParams?.has('queryLanguage')
    }
  }

  await waitLocale()
}
