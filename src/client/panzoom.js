const { orbit } = require('@jscad/regl-renderer').controls
const rotateSpeed = 0.002
const panSpeed = 1
const zoomSpeed = 0.08

module.exports = function (scope) {
    const { camera, controls, panDelta, rotateDelta, zoomDelta } = scope;
    if (rotateDelta[0] || rotateDelta[1]) {
        const updated = orbit.rotate({ controls, camera, speed: rotateSpeed }, rotateDelta)
        scope.rotateDelta = [0, 0]
        scope.updateOrbitControls(updated.controls)
    }

    if (panDelta[0] || panDelta[1]) {
        const updated = orbit.pan({ controls, camera, speed: panSpeed }, panDelta)
        scope.panDelta = [0, 0]
        camera.position = updated.camera.position
        camera.target = updated.camera.target
    }

    if (zoomDelta) {
        const updated = orbit.zoom({ controls, camera, speed: zoomSpeed }, zoomDelta)
        scope.updateOrbitControls(updated.controls)
        scope.zoomDelta = 0
    }
}
