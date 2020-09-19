import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { withI18next } from 'storybook-addon-i18next'

import i18n from '../src/i18n/I18n'

export const parameters = {
  viewport: {
    viewports: {
      ...INITIAL_VIEWPORTS,
      desktopDefault: {
        name: 'Desktop 1080p',
        styles: {
          width: '1920px',
          height: '1080px'
        }
      }
    }
  }
}

export const decorators = [
  withI18next({
    i18n,
    languages: {
      en: 'English',
      fr: 'French'
    }
  })
]
