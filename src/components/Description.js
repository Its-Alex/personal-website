import React from 'react'
import ReactMarkdown from 'react-markdown'
import { useTranslation } from 'react-i18next'

const Theme = (props) => {
  const { t } = useTranslation()

  return (
    <>
      <ReactMarkdown source={t(`
I'm [Alexandre]({{githubLink}}).

I'm [software craftsman](https://en.wikipedia.org/wiki/Software_craftsmanship) at [Spacefill]({{spacefillFrLink}}).

[Open source](https://en.wikipedia.org/wiki/Open_source) lover.

Old student at [42]({{fortyTwoLink}}).

you can find me on [Github]({{githubLink}}),
[Linkedin]({{linkedinLink}}),
[Twitter]({{twitterLink}}).
          `, {
        githubLink: 'https://github.com/Its-Alex',
        linkedinLink: 'https://www.linkedin.com/in/its-alex/',
        twitterLink: 'https://twitter.com/Its__Alex__',
        spacefillFrLink: 'https://www.spacefill.fr/fr/',
        fortyTwoLink: 'https://www.42.fr/'
      })} />
    </>
  )
}

export default Theme
