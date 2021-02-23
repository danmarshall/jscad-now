const fs = require('fs')
const path = require('path')
const createProject = require('./project')
const createServer = require('./budo')
const listener = require('./listener')

const modelFile = process.argv[2] || './index.js'
let modelFileExists = false

try {
  fs.statSync(path.resolve(modelFile))
  modelFileExists = true
}
catch (e) {
  console.log(e)
}

if (modelFileExists) {

  const project = createProject(modelFile)
  const budoInstance = createServer(project)
  listener({ project, budoInstance })

} else {
  console.log(`input file "${modelFile}" does not exist`)
  process.exitCode = 1
}
