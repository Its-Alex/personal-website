import React from 'react'
import ReactMarkdown from 'react-markdown'

const markdownText = `# Hi

This sentence is written with **markdown**`

export const Default = () => <ReactMarkdown>{markdownText}</ReactMarkdown>

export default {
  title: 'Components/Markdown',
  component: ReactMarkdown
}
