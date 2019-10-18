// src/main.js
import { version } from '../package.json'
import foo from './foo.js'

export default function () {
  console.log('version ' + version)
  console.log(foo)
}
