module.exports = function () {
    const el = document.createElement('div')
    el.className = 'regl-renderer'
    document.body.appendChild(el)
    return el
}
