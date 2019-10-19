import { SlackGenerator } from '../slack.js'

describe('slack data json generator', () => {
  describe('section', () => {
    test('can generate section text', () => {
      const slack = new SlackGenerator({
        blocks: [
          {
            section: {
              text: 'john doe ❤️'
            }
          }
        ]
      })

      expect(slack.getJson()).toEqual('{"blocks":[{"type":"section","text":{"type":"plain_text","emoji":true,"text":"john doe ❤️"}}]}')
      // curl -X POST -H 'Content-type: application/json' --data '{"blocks":[{"type":"section","text":{"type":"plain_text","emoji":true,"text":"hello world"},"accessory":{"type":"image","image_url":"https://api.slack.com/img/blocks/bkb_template_images/palmtree.png","alt_text":"palmtree.png","title":{"type":"plain_text","emoji":true,"text":"palmtree.png"}}}]}' https://hooks.slack.com/services/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
    })

    test('can generate section text as <String>', () => {
      const slack = new SlackGenerator({
        blocks: [
          { section: 'hello world' }
        ]
      })

      expect(slack.getJson()).toEqual('{"blocks":[{"type":"section","text":{"type":"plain_text","emoji":true,"text":"hello world"}}]}')
    })

    test('can generate section markdown', () => {
      const slack = new SlackGenerator({
        blocks: [
          {
            section: {
              markdown: '`john doe`'
            }
          }
        ]
      })

      expect(slack.getJson()).toEqual('{"blocks":[{"type":"section","text":{"type":"mrkdwn","text":"`john doe`"}}]}')
    })

    test('can generate section text with picture', () => {
      const slack = new SlackGenerator({
        blocks: [
          {
            section: {
              text: 'hello world',
              image: 'https://api.slack.com/img/blocks/bkb_template_images/palmtree.png'
            }
          }
        ]
      })

      expect(slack.getJson()).toEqual('{"blocks":[{"type":"section","text":{"type":"plain_text","emoji":true,"text":"hello world"},"accessory":{"type":"image","image_url":"https://api.slack.com/img/blocks/bkb_template_images/palmtree.png","alt_text":"palmtree.png"}}]}')
    })
  })

  describe('image', () => {
    test('can generate image as <String>', () => {
      const slack = new SlackGenerator({
        blocks: [
          {
            image: 'https://api.slack.com/img/blocks/bkb_template_images/palmtree.png'
          }
        ]
      })

      expect(slack.getJson()).toEqual('{"blocks":[{"type":"image","image_url":"https://api.slack.com/img/blocks/bkb_template_images/palmtree.png","alt_text":"palmtree.png","title":{"type":"plain_text","emoji":true,"text":"palmtree.png"}}]}')
    })

    test('can generate image block', () => {
      const slack = new SlackGenerator({
        blocks: [
          {
            image: {
              url: 'https://api.slack.com/img/blocks/bkb_template_images/palmtree.png',
              alt: 'hello world',
              title: 'hello world'
            }
          }
        ]
      })

      expect(slack.getJson()).toEqual('{"blocks":[{"type":"image","image_url":"https://api.slack.com/img/blocks/bkb_template_images/palmtree.png","alt_text":"hello world","title":{"type":"plain_text","emoji":true,"text":"hello world"}}]}')
    })
  })
})
