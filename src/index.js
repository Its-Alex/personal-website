import React from 'react'
import ReactDOM from 'react-dom'

import * as serviceWorker from './ServiceWorker'
import GlobalTheme from './components/Theme'
import Home from './pages/Home'
import './i18n/I18n'

ReactDOM.render(<GlobalTheme>
  <Home />
</GlobalTheme>, document.getElementById('root'))

serviceWorker.unregister()
