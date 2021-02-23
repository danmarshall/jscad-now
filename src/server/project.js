const fs = require('fs')
const path = require('path')

const fileName = 'jscad-now.js'
const template = fs.readFileSync(path.join(__dirname, 'template.js'), 'utf-8')
const header = '//this is a generated file, safe to delete it'

function fixSlashes(s) {
    return s.replace(/\\/g, '/')
}

module.exports = function (modelFile) {
    // create file from template
    const content = template
        .replace('<MODEL>', fixSlashes(modelFile))
        .replace('<CLIENT>', fixSlashes(path.join(__dirname, '../client')))
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
