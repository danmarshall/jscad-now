const budo = require('budo')
const browserifyCss = require('browserify-css')

module.exports = function (opts) {
    const { filename, cleanup } = opts
    return budo(filename,
        {
            live: true,
            open: true,
            port: 8099,
            stream: process.stdout,
            browserify: {
                plugin: b => b.transform(browserifyCss, {global: true})
            }
        }
    ).on('exit', cleanup)
}
