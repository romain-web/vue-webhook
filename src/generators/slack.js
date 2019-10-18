export class slackGenerator {
  construtor (optionsBlocks) {
    this.optionsBlocks = !Array.isArray(optionsBlocks) ? [optionsBlocks] : optionsBlocks
    this.slackBlocks = []

    this.blockBase = {
      type: 'section'
    }

    this.generateSlackBlocks()
  }

  generateSlackBlocks () {
    const slackBlocks = []

    this.optionsBlocks.forEach((content, type) => {
      if (type === 'markdown') {
        slackBlocks.push(this.blockMarkdown(content))
      }

      if (type === 'image') {
        slackBlocks.push(this.blockImage(content))
      }

      if (type === 'divider') {
        slackBlocks.push(this.blockDivider())
      }

      if (type === 'text') {
        slackBlocks.push(this.blockText(content))
      }
    })
  }

  blockText (text = '') {
    return {
      ...this.blockBase,
      text: {
        type: 'plain_text',
        emoji: true,
        text: text
      }
    }
  }

  blockMarkdown (markdown = '') {
    return {
      ...this.blockBase,
      text: {
        type: 'mrkdwn',
        text: markdown
      }
    }
  }

  blockImage ({ url = '', alt = 'image' }) {
    return {
      ...this.blockBase,
      accessory: {
        type: 'image',
        image_url: url,
        alt_text: alt
      }
    }
  }

  blockDivider () {
    return {
      type: 'divider'
    }
  }

  getJson () {
    return JSON.stringify({
      blocks: this.slackBlocks()
    })
  }
}

export default slackGenerator
