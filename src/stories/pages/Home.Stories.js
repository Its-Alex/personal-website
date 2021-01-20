/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/react'

import Home from '../../pages/Home'
import GlobalTheme from '../../components/Theme'

export const Default = () => (
  <GlobalTheme>
    <Home />
  </GlobalTheme>
)

export default {
  title: 'Pages/Home',
  component: Home
}
