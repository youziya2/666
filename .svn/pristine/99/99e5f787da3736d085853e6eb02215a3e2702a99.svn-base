'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

let params = process.argv[4]
let baseUrl = ''
switch (params) {
    case '--env=test':
      baseUrl = '"http://screenbehind"'
      break
    case '--env=prod':
      baseUrl = '"http://screen.honglingview.com"'
      break
    default:
      baseUrl = '"http://screenbehind"'
}
module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  baseUrl: baseUrl
})
