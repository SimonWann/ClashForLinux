const fs = require('fs')
const path = require('path')
const readline = require('readline')

module.exports = async function () {
  const result = []
  const location = path.join(__dirname, '../../clash/profileUrl')
  const fileStream = fs.createReadStream(location)
  const read = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  })
  for await(const line of read) {
    result.push(line)
  }
  return result
}