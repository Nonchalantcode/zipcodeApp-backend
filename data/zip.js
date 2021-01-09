const fs = require('fs')
const path = require('path')

let data = JSON.parse(
    fs.readFileSync(
        path.resolve(__dirname, 'data.json'), {encoding: 'utf8'}
    )
)

module.exports = data