const fs = require('fs')
const path = require('path')

const filename = 'jscad-now.js'
const template = fs.readFileSync(path.join(__dirname, 'template.js'), 'utf-8')
const header = '//this is a generated file, safe to delete it'

function fixSlashes(s) {
    return s.replace(/\\/g, '/')
}

module.exports = function (size, modelFile) {
    // create file from template
    const content = template
        .replace('SIZE', JSON.stringify(size))
        .replace('MODEL', JSON.stringify(fixSlashes(modelFile)))
        .replace('CLIENT', JSON.stringify(fixSlashes(path.join(__dirname, '../client'))))
    fs.writeFileSync(filename, `${header}\n${content}`, 'utf-8')
    return {
        filename,
        cleanup: () => {
            //delete file
            fs.unlinkSync(filename)
            process.exit()
        }
    }
}
