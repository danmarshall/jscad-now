const { controls } = require('@jscad/regl-renderer')

let orbitControls = controls.orbit.defaults

function getOrbitControls() {
    return orbitControls
}

function updateOrbitControls(updated) {
    orbitControls = { ...orbitControls, ...updated }
}

module.exports = { getOrbitControls, updateOrbitControls }
