const budo = require('budo')
const fs = require('fs')
const path = require('path')

function fixSlashes(s) {
  return s.replace(/\\/g, '/')
}

function createProject(opts) {
  // create file from template
  const template = fs.readFileSync(path.join(__dirname, 'template.js'), 'utf-8')
  const header = '//this is a generated file, safe to delete it'
  const content = template
    .replace('<INPUT>', fixSlashes(opts.modelFile))
    .replace('<JSCAD-NOW-SRC>', fixSlashes(path.join(__dirname, '..')))
  const fileName = 'jscad-now.js'
  fs.writeFileSync(fileName, `${header}\n${content}`, 'utf-8')
  return {
    fileName,
    cleanup: () => {
      //delete file
      fs.unlinkSync(fileName)
      process.exit()
    }
  }
}

function createServer(opts) {
  return budo(opts.fileName,
    {
      css: '../src/client/index.css',
      live: true,
      open: true,
      port: 8099,
      stream: process.stdout,
    }
  ).on('exit', opts.cleanup)
}

function listener(opts) {
  const close = () => {
    console.log('exiting, please wait...')
    opts.budoInstance.close()
    process.stdin.removeAllListeners('data')
  }
  const allCommands = `press ENTER to close server and clean up "${opts.project.fileName}" project file`
  opts.budoInstance.on('connect', () => {
    console.log(allCommands)
  })
  process.stdin.setEncoding('utf-8')
  process.stdin.on('data', data => {
    close()
  })
  process.on("SIGINT", function () {
    close()
  })
}

const modelFile = process.argv[2] || './index.js'
let modelFileExists = false

try {
  fs.statSync(path.resolve(modelFile))
  modelFileExists = true
}
catch (e) { }

if (modelFileExists) {

  const project = createProject({ modelFile })
  const budoInstance = createServer(project)
  listener({ project, budoInstance })

} else {
  console.log(`input file "${modelFile}" does not exist`)
  process.exitCode = 1
}
