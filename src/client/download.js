const html = require('nanohtml')
const createElement = require('./element')
const serializer = require('@jscad/stl-serializer')

const buttons = (scope) => {
    const labelName = html`<label>name: </label>`
    const textName = html`<input type="text" value="model">`
    const button = html`<button>download</button>`
    const hr = html`<hr>`
    const resetCameraButton = html`<button>reset camera</button>`
    const links = createElement('links')
    button.onclick = () => {
        const solids = scope.model(scope.paramState)
        const str = serializer.serialize({
            binary: false,
            statusCallback: (status) => {
                links.innerHTML = status.progress
            }
        }, solids)

        links.innerHTML = '';
        const link = html`<a href="data:application/stl,${encodeURIComponent(str.join(''))}" download="${textName.value}.stl" >${textName.value}.stl</a>`
        links.appendChild(link)
    }

    resetCameraButton.onclick = () => {
        window.skipCamera = true
        window.localStorage.removeItem('jscad-now-camera')
        location.reload()
    }

    const d = createElement('download')
    d.appendChild(labelName)
    d.appendChild(textName)
    d.appendChild(button)
    d.appendChild(hr)
    d.appendChild(resetCameraButton)
    d.appendChild(links)
}

module.exports = buttons
