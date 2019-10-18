import axios from 'axios'

import { SlackGenerators } from './generators/slack'

export class Webhook {
  constructor (vm) {
    this.vm = vm
  }

  push (message, options) {
    const url = 'https://hooks.slack.com/services/{YOUR_WEBHOOK}'
    const data = new SlackGenerators({
      text: message
    }).getJson()

    axios.post(url, data, {
      withCredentials: false,
      transformRequest: [(data, headers) => {
        delete headers.post['Content-Type']
        return data
      }]
    })
  }
}
