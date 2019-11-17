/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useTranslation } from 'react-i18next'

import LeftBar from '../components/LeftBar'
import Description from '../components/Description'

const Home = (props) => {
  const { t } = useTranslation()
  console.log(t(`
Je suis [Alexandre]({{githubLink}}), développeur.

Je suis developpeur fullstack a [Spacefill]({{spacefillFrLink}}).

Amoureux de l'[Open source]({{openSourceWikiFrLink}}).

Ancien élève a [42]({{fortyTwoLink}}).

Vous pouvez me trouver sur [Github]({{githubLink}}),
[Linkedin]({{linkedinLink}}),
[Twitter]({{twitterLink}}).
          `, {
    githubLink: 'https://github.com/Its-Alex',
    linkedinLink: 'https://www.linkedin.com/in/its-alex/',
    twitterLink: 'https://twitter.com/Its__Alex__',
    openSourceWikiFrLink: 'https://fr.wikipedia.org/wiki/Open_source',
    spacefillFrLink: 'https://www.spacefill.fr/fr/',
    fortyTwoLink: 'https://www.42.fr/'
  }))

  return (
    <div id='root-container' css={css`
    display: grid;
    grid-template-rows: 100%;
    grid-template-columns: 20% 80%;
  `} >
      <LeftBar id='sidebar' css={css`
        grid-column: 1 / 2;

        padding-right: 10%;
      `} />
      <div id='root-content' css={css`
        grid-column: 2 / 2;

        display: grid;
        place-items: center;
      `} >
        <div>
          <Description />
        </div>
      </div>
    </div>
  )
}

export default Home
