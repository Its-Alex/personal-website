/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useTranslation } from 'react-i18next'

const SidebarCSS = css`
  display: grid;
  place-content: center;
  
  background: linear-gradient(10deg, #502BE3, #9630FD);

  @media screen and (min-width: 750px) {
    max-width: 450px;

    grid-template-columns: 100%;
    grid-template-rows: 21% 20% 8% 20% 31%;

    clip-path: polygon(0 0, 100% 0, 70% 100%, 0% 100%);
  }
  @media screen and (max-width: 750px) {
    grid-template-columns: 20% 20% 20% 20% 20%;
    grid-template-rows: 100%;
  }
`

const ImageProfilCSS = css`
  width: 100%;
  max-width: 300px;

  border-radius: 100%;
`

const Sidebar = (props) => {
  const { t } = useTranslation()

  return (
    <div
      {...props}
      css={SidebarCSS}
    >
      <div
        css={css`
          display: grid;
          grid-template: 100% / 100%;
          place-items: center;
          @media screen and (min-width: 750px) {
            padding: 10%;


            grid-row-start: 2;
          }
          @media screen and (max-width: 750px) {
            grid-column-start: 2;
          }
        `}
      >
        <img
          id='sidebar-img'
          src='https://s.gravatar.com/avatar/558cb4dd16019bf6123d241ad5d6ee56?s=512'
          srcSet={`https://s.gravatar.com/avatar/558cb4dd16019bf6123d241ad5d6ee56?s=320 64w,
                  https://s.gravatar.com/avatar/558cb4dd16019bf6123d241ad5d6ee56?s=480 128w,
                  https://s.gravatar.com/avatar/558cb4dd16019bf6123d241ad5d6ee56?s=800 256w`}
          sizes='(max-width: 64px) 64px,
              (max-width: 128px) 128px,
              (max-width: 256px) 256px,
              512px'
          alt='profil' css={ImageProfilCSS}
        />
      </div>
      <ul id='sidebar-list' css={css`
        display: grid;
        place-content: center;

        font-weight: 900;
        font-size: 1,2rem;
        color: #FCFBFB;

        @media screen and (min-width: 750px) {
          grid-template-rows: 30% 20% 20% 30%;

          grid-row-start: 4;
        }
        @media screen and (max-width: 750px) {
          grid-column-start: 4;
        }

      `}>
        <li className='sidebar-menu' css={css`grid-row-start: 3;`}><a css={css`
          font-size: 1.3rem;
        `} href={t('link|resume')}>{t('Resume')}</a></li>
      </ul>
    </div>
  )
}

export default Sidebar
