const axios = require('axios')
const fs = require('fs')
const path = require('path')



async function update (str) {
  if(typeof(str) !== 'string') throw Error('Input type shoul be string')
  fs.appendFile(path.join(__dirname, '../../clash/profileUrl'), `\n${str}`, (err) => {
    err?console.log({err}):'ok'
  })
  let result
  try {
    result = (await axios.get(str)).data
    await fs.promises.writeFile(path.join(__dirname, '../../clash', 'config.yaml'), result)
    return result
  } catch (error) {
    throw Error(error)
  }
}
module.exports = update