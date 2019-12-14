'use strict'

let params = process.argv[2]
let baseUrl = ''
switch (params) {
    case 'test':
      baseUrl = '"http://screenbehind"'
      break
    case 'prod':
      baseUrl = '"http://screen.honglingview.com"'
      break
    default:
      baseUrl = '"http://screenbehind"'
}

module.exports = {
  NODE_ENV: '"production"',
  baseUrl: baseUrl
}
