/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { storiesOf } from '@storybook/react'

import LeftBar from '../../src/components/LeftBar'

storiesOf('Components/LeftBar', module)
  .add('LeftBar', () => {
    return <LeftBar css={css` width: 100%; height: 100%; `} />
  })
