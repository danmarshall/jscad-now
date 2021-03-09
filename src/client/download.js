const html = require('nanohtml')
const createElement = require('./element')
const serializer = require('@jscad/stl-serializer')

const buttons = (scope) => {
    const button = html`<button id='updateDesignFromParams' >download</button>`
    const div = createElement('links')
    button.onclick = () => {
        const solids = scope.model(scope.paramState)
        const str = serializer.serialize({
            binary: false,
            statusCallback: (status) => {
                div.innerHTML = status.progress
            }
        }, solids)

        div.innerHTML = '';
        const link = html`<a href="data:application/stl,${encodeURIComponent(str.join(''))}" download="${'foo.stl'}" >download</a>`
        div.appendChild(link)
    }

    const d = createElement('download')
    d.appendChild(button)
    d.appendChild(div)
}

module.exports = buttons
