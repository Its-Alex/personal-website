import React from 'react'
import ReactDOM from 'react-dom'

import * as serviceWorker from './ServiceWorker'
import Home from './pages/Home'
import './i18n/I18n'
import './index.css'

ReactDOM.render(<Home />, document.getElementById('root'))

serviceWorker.unregister()
