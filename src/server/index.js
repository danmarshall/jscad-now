const fs = require('fs')
const path = require('path')
const createProject = require('./project')
const createBudo = require('./budo')
const listener = require('./listener')

const modelFile = process.argv.length > 2 
  ? path.resolve(process.argv[2]) 
  : path.resolve('./index.js')
let modelFileExists = false

try {
  fs.statSync(path.resolve(modelFile))
  modelFileExists = true
}
catch (e) {
  console.log(e)
}

if (modelFileExists) {

  const gridsize = [500, 500]
  const project = createProject(gridsize, modelFile)
  const budo = createBudo(project)
  listener({ project, budo })

} else {
  console.log(`input file "${modelFile}" does not exist`)
  process.exitCode = 1
}
