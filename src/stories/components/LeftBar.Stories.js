/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import LeftBar from '../../components/LeftBar'

export const Default = () => (
  <LeftBar
    css={css`
      height: 100%;
      width: 100%;
    `}
  />
)

export default {
  title: 'Components/LeftBar',
  component: LeftBar
}
