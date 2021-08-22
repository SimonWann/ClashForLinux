const express = require('express')
const { join } = require('path')
// const path = require('path')

function run() {
  const app = express()
  let port = 8866

  app.use(express.static(join(__dirname, '../dist')))

  // app.get('/', join())

  app.listen(port, (err) => {
    if(err) throw err
    console.log(`Port: ${port}\nRuning successful!`)
  })
  return {run ,port}
}

module.exports = {
  run
}