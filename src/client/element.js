module.exports = function (className, tagname = 'div') {
    const el = document.createElement(tagname)
    if (className) {
        el.className = className
    }
    document.body.appendChild(el)
    return el
}
