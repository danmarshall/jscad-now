const { orbit } = require('@jscad/regl-renderer').controls
const rotateSpeed = 0.002
const panSpeed = 1
const zoomSpeed = 0.08

module.exports = function (scope) {
    const { camera, controls } = scope;
    if (scope.rotateDelta[0] || scope.rotateDelta[1]) {
        const updated = orbit.rotate({ controls, camera, speed: rotateSpeed }, scope.rotateDelta)
        scope.rotateDelta = [0, 0]
        scope.updateOrbitControls(updated.controls)
    }

    if (scope.panDelta[0] || scope.panDelta[1]) {
        const updated = orbit.pan({ controls, camera, speed: panSpeed }, scope.panDelta)
        scope.panDelta = [0, 0]
        camera.position = updated.camera.position
        camera.target = updated.camera.target
    }

    if (scope.zoomDelta) {
        const updated = orbit.zoom({ controls, camera, speed: zoomSpeed }, scope.zoomDelta)
        scope.updateOrbitControls(updated.controls)
        scope.zoomDelta = 0
    }
}
