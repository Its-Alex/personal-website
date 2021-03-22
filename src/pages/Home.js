/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, css } from '@emotion/react'

import LeftBar from '../components/LeftBar'
import Description from '../components/Description'

const Home = (props) => {
  return (
    <div
      id='root-container'
      css={css`
        display: grid;

        @media screen and (min-width: 750px) {
          grid-template-rows: 100%;
          grid-template-columns: 20% 80%;
        }

        @media screen and (max-width: 750px) {
          grid-template-rows: 20% 80%;
          grid-template-columns: 100%;
        }
      `}
    >
      <LeftBar
        id='sidebar'
        css={css`
          @media screen and (min-width: 750px) {
            padding-right: 10%;
            grid-column: 1 / 2;
          }

          @media screen and (max-width: 750px) {
            grid-row: 1 / 2;
          }
        `}
      />
      <div
        id='root-content'
        css={css`
          display: grid;
          place-items: center;

          @media screen and (min-width: 750px) {
            grid-column: 2 / 2;
          }

          @media screen and (max-width: 750px) {
            grid-column: 1;
            grid-row: 2 / 2;
          }
        `}
      >
        <div>
          <Description />
        </div>
      </div>
    </div>
  )
}

export default Home
