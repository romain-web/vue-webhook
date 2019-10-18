import json from 'rollup-plugin-json'
import babel from 'rollup-plugin-babel'

export default {
  input: 'src/main.js',
  output: [{
    file: 'dist/vue-webhook.js',
    format: 'cjs',
    name: 'vue-webhook'
  }, {
    file: 'dist/vue-webhook.esm.js',
    format: 'esm',
    name: 'vue-webhook'
  }, {
    file: 'dist/vue-webhook.umd.js',
    format: 'umd',
    name: 'vue-webhook'
  }],
  plugins: [
    json(),
    babel({
      exclude: 'node_modules/**'
    })
  ]
}
