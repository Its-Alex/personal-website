import React from 'react'
import ReactDOM from 'react-dom'
import ReactGA from 'react-ga'

import * as serviceWorker from './ServiceWorker'
import GlobalTheme from './components/Theme'
import Home from './pages/Home'
import './i18n/I18n'

ReactGA.initialize('UA-152708823-1')
ReactGA.pageview('/')

ReactDOM.render(
  <GlobalTheme>
    <Home />
  </GlobalTheme>
  , document.getElementById('root'))

serviceWorker.unregister()
