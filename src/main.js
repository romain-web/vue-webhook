// src/main.js
import { version as VERSION } from '../package.json'
import Webhook from './Webhook.js'

const plugin = {}

export function install (Vue, options) {
  if (install.installed) return
  install.installed = true

  Object.defineProperty(Vue.prototype, '$webhook', {
    get () {
      if (!this.$_webhook) {
        this.$_webhook = new Webhook(this)
      }
      return this.$_webhook
    }
  })

  plugin.install = install
  plugin.version = VERSION
}

export const VueWebhook = plugin

// Auto-install
let Vue = null

if (typeof window !== 'undefined') {
  Vue = window.Vue
} else if (typeof global !== 'undefined') {
  Vue = global.Vue
}

if (Vue) {
  Vue.use(plugin)
}

export default plugin
