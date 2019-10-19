export class SlackGenerator {
  constructor (options) {
    console.log(options)
    this.optionsBlocks = options.blocks || {}
    this._blocks = []

    this.generateBlocks()
  }

  get blocks () {
    return this._blocks
  }

  generateBlocks () {
    this.optionsBlocks.forEach(block => {
      if (block.section) {
        let section = block.section

        if (section.charAt) {
          section = { text: section }
        }

        this._blocks.push(
          section.markdown
            ? this.blockSectionMarkdown(section.markdown, section.image)
            : this.blockSectionText(section.text, section.image)
        )
        return
      }

      if (block.image) {
        this._blocks.push(this.blockImage(block.image))
      }

      // if (type === 'markdown') {
      //   this._blocks.push(this.blockMarkdown(content))
      //   return
      // }

      // if (type === 'text') {
      //   this._blocks.push(this.blockText(content))
      //   return
      // }

      // if (type === 'divider') {
      //   this._blocks.push(this.blockDivider())
      //   return
      // }
    })
  }

  blockPlainText (text = '') {
    return {
      type: 'plain_text',
      emoji: true,
      text: text
    }
  }

  blockMarkdown (markdown = '') {
    return {
      type: 'mrkdwn',
      text: markdown
    }
  }

  // imageOptions: String | Object { url, alt, title }
  blockImage (imageOptions, useTitle = true) {
    let options, filename

    if (imageOptions.charAt) {
      filename = imageOptions.match(/(?:[^/][\d\w.]+)$(?<=\.\w{3,4})/)[0]
      options = {
        url: imageOptions,
        alt: filename,
        title: filename
      }
    } else if (imageOptions instanceof Object) {
      options = imageOptions
      filename = imageOptions.url.match(/(?:[^/][\d\w.]+)$(?<=\.\w{3,4})/)[0]
    }

    const block = {
      type: 'image',
      image_url: options.url,
      alt_text: options.alt || filename
    }

    if (useTitle && options.title) {
      block.title = this.blockPlainText(options.title || filename)
    }

    return block
  }

  blockSectionText (text = '', image = null) {
    const section = {
      type: 'section',
      text: this.blockPlainText(text)
    }

    if (image) {
      this.addBlockAccessory(section, image)
    }

    return section
  }

  blockSectionMarkdown (markdown = '', image = null) {
    const section = {
      type: 'section',
      text: this.blockMarkdown(markdown)
    }

    if (image) {
      this.addBlockAccessory(section, image)
    }

    return section
  }

  addBlockAccessory (parentBlock, image) {
    if (!image) {
      return
    }

    parentBlock.accessory = this.blockImage(image, false)
  }

  blockDivider () {
    return {
      type: 'divider'
    }
  }

  getJson () {
    return JSON.stringify({
      blocks: this._blocks
    })
  }
}

export default SlackGenerator
