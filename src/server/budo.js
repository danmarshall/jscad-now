const budo = require('budo')

module.exports = function (opts) {
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
