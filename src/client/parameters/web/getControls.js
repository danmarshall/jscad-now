//from https://github.com/jscad/OpenJSCAD.org/blob/V2/packages/web/src/ui/flow/design.js
module.exports = function () {
    return Array.from(document.getElementById('paramsTable').getElementsByTagName('input'))
    .concat(Array.from(document.getElementById('paramsTable').getElementsByTagName('select')))
    .concat(Array.from(document.getElementById('paramsTable').getElementsByClassName('groupTitle')))
}
