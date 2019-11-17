/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useTranslation } from 'react-i18next'

const SidebarCSS = css`
  max-width: 450px;

  display: grid;
  grid-template-columns: 100%;
  grid-template-rows: 21% 20% 8% 20% 31%;
  place-content: center;
  
  clip-path: polygon(0 0, 100% 0, 70% 100%, 0% 100%);

  background: linear-gradient(10deg, #502BE3, #9630FD);
`

const ImageProfilCSS = css`
  width: 100%;
  max-width: 300px;

  border-radius: 100%;
`

const Sidebar = (props) => {
  const { t } = useTranslation()

  return (
    <div {...props} css={SidebarCSS}>
      <div css={css`
        grid-row-start: 2;

        padding: 10%;

        display: grid;
        grid-template: 100% / 100%;

        place-items: center;
      `}>
        <img id='sidebar-img' src='https://s.gravatar.com/avatar/558cb4dd16019bf6123d241ad5d6ee56?s=512'
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
        grid-row-start: 4;

        display: grid;
        grid-template-rows: 30% 20% 20% 30%;
        place-content: center;

        font-weight: 900;
        font-size: 1,2rem;
        color: #FCFBFB;
      `}>
        <li className='sidebar-menu' css={css`grid-row-start: 2;`}><a css={css`
          font-size: 1.3rem;
        `} href='#a'>{t('Skills')}</a></li>
        <li className='sidebar-menu' css={css`grid-row-start: 3;`}><a css={css`
          font-size: 1.3rem;
        `} href={t('link:resume')}>{t('Resume')}</a></li>
      </ul>
    </div>
  )
}

export default Sidebar
