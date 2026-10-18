import { defineI18n } from 'sveltekit-i18n/kit'

export const config = {
  initLocale: 'en',
  fallbackLocale: 'en',
  loaders: [
    {
      locale: ['en', 'fr'],
      namespace: 'common',
      loader: async ({ locale }: { locale: string }) =>
        (await import(`./locales/${locale}.json`)).default
    }
  ]
}

// Resolution order: ?queryLanguage → `lang` cookie → Accept-Language → initLocale.
export const { handle, load, use, get } = defineI18n(config, {
  preferredLocale: (event) =>
    event.url.searchParams.get('queryLanguage') ?? event.cookies?.get('lang')
})
