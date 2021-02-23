function close(budoInstance) {
    console.log('exiting, please wait...')
    budoInstance.close()
    process.stdin.removeAllListeners('data')
}

module.exports = function (opts) {
    const allCommands = `press ENTER to close server and clean up "${opts.project.fileName}" project file`
    opts.budoInstance.on('connect', () => {
        console.log(allCommands)
    })
    process.stdin.setEncoding('utf-8')
    process.stdin.on('data', data => {
        close(opts.budoInstance)
    })
    process.on("SIGINT", function () {
        close(opts.budoInstance)
    })
}
