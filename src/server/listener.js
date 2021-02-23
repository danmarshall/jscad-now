function close(budo) {
    console.log('exiting, please wait...')
    budo.close()
    process.stdin.removeAllListeners('data')
}

module.exports = function (opts) {
    const { budo, project } = opts
    budo.on('connect', () => {
        console.log(`press ENTER to close server and clean up "${project.filename}" project file`)
    })
    process.stdin.setEncoding('utf-8')
    process.stdin.on('data', data => {
        close(budo)
    })
    process.on("SIGINT", function () {
        close(budo)
    })
}
