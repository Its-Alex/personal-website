import React from 'react'
import { storiesOf } from '@storybook/react'
import ReactMarkdown from 'react-markdown'

const markdownText = `# Hi

This sentence is written with **markdown**`

storiesOf('Components/Markdown', module)
  .add('Default', () => {
    return <ReactMarkdown source={markdownText} />
  })
