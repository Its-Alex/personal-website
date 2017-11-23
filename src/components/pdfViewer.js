import React, { Component } from 'react'
import { Document, Page, setOptions } from 'react-pdf/build/entry.webpack'

setOptions({
  cMapUrl: 'cmaps/',
  cMapPacked: true
})

class Sample extends Component {
  constructor (props) {
    super(props)

    this.state = {
      file: './CV_Alexandre_EN.pdf',
      numPages: null
    }
  }

  onDocumentLoadSuccess ({ numPages }) {
    this.setState({
      numPages
    })
  }

  render () {
    const { file, numPages } = this.state

    return (
      <div className='Example'>
        <header>
          <h1>react-pdf sample page</h1>
        </header>
        <div className='Example__container'>
          <div className='Example__container__load' />
          <div className='Example__container__document'>
            <Document
              file={file}
              onLoadSuccess={this.onDocumentLoadSuccess.bind(this)} >
              {
                Array.from(
                  new Array(numPages), (el, index) => (
                    <Page
                      key={`page_${index + 1}`}
                      pageNumber={index + 1}
                    />
                  )
                )
              }
            </Document>
          </div>
        </div>
      </div>
    )
  }
}

export default Sample
