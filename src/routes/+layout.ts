import { browser } from '$app/environment'
// Initialize i18n
import '$lib/i18n'
import { locale, waitLocale } from 'svelte-i18n'

export const load = async (): Promise<void> => {
  if (browser) {
    const searchParams = new URL(window.location.href).searchParams

    if (searchParams?.has('queryLanguage')) {
      locale.set(searchParams?.get('queryLanguage'))
        ?.catch((err: Error) => {
          console.error(err)
        })
    } else {
      searchParams?.has('queryLanguage')
    }
  }

  try {
    await waitLocale()
  } catch (error) {
    console.error(error)
  }
}
