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
    this.onChangeFile = this.onChangeFile.bind(this)
  }

  onDocumentLoadSuccess ({ numPages }) {
    this.setState({
      numPages
    })
  }

  onChangeFile () {
    this.setState((prevState) => {
      if (prevState.file === './CV_Alexandre_EN.pdf') {
        return { file: './CV_Alexandre_FR.pdf' }
      } else if (prevState.file === './CV_Alexandre_FR.pdf') {
        return { file: './CV_Alexandre_EN.pdf' }
      }
    })
  }

  render () {
    return (
      <div id='root-container'>
        <div className='pdfView'>
          <div className='header'>
            <p>Curriculum vitae</p>
            <div className='options'>
              <a href={this.state.file} download='CV_Alexandre.pdf' >Download</a>
              {this.state.file.indexOf('FR') !== -1
                ? <p onClick={this.onChangeFile}>EN</p>
                : <p onClick={this.onChangeFile}>FR</p>}
            </div>
          </div>
          <div className='pdf-container'>
            <Document
              file={this.state.file}
              onLoadSuccess={this.onDocumentLoadSuccess.bind(this)} >
              {
                  Array.from(
                    new Array(this.state.numPages), (el, index) => (
                      <Page
                        key={`page_${index + 1}`}
                        pageNumber={index + 1}
                        scale={1.5}
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
