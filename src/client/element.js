module.exports = function (className) {
    const el = document.createElement('div')
    el.className = className
    document.body.appendChild(el)
    return el
}
