import React from 'react'
import ReactDOM from 'react-dom'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'

import * as serviceWorker from './ServiceWorker'
import GlobalTheme from './components/Theme'
import Home from './pages/Home'
import './i18n/I18n'

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql'
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <GlobalTheme>
      <Home />
    </GlobalTheme>
  </ApolloProvider>
  , document.getElementById('root'))

serviceWorker.unregister()
