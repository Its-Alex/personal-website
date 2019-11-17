import { configure, addParameters, addDecorator } from '@storybook/react'
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport'
import { withI18next } from 'storybook-addon-i18next'

import i18n from '../src/i18n/I18n'

addParameters({
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
    },
    defaultViewport: 'desktopDefault'
  }
})

addDecorator(
  withI18next({
    i18n,
    languages: {
      en: 'English',
      fr: 'French'
    }
  })
)

function loadStories (r) {
  r.keys().sort().forEach(filename => r(filename))
}

configure(() => {
  loadStories(require.context('../stories', true, /\.js$/))
}, module)
