import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useTranslation } from 'react-i18next'

const Theme = (props) => {
  const { t } = useTranslation()

  return (
    <>
      <ReactMarkdown source={t(`
Je suis [Alexandre]({{githubLink}}).

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
      })} />
    </>
  )
}

export default Theme
