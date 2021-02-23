const budo = require('budo')

module.exports = function (opts) {
    const { filename, cleanup } = opts
    return budo(filename,
        {
            css: '../src/client/index.css',
            live: true,
            open: true,
            port: 8099,
            stream: process.stdout,
        }
    ).on('exit', cleanup)
}
