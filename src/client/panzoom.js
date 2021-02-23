const { controls } = require('@jscad/regl-renderer')
const { getOrbitControls, updateOrbitControls } = require('./controls')
const rotateSpeed = 0.002
const panSpeed = 1
const zoomSpeed = 0.08

module.exports = function (scope) {
    const { camera } = scope;
    return () => {
        if (scope.rotateDelta[0] || scope.rotateDelta[1]) {
            const updated = controls.orbit.rotate({ controls: getOrbitControls(), camera, speed: rotateSpeed }, scope.rotateDelta)
            scope.rotateDelta = [0, 0]
            updateOrbitControls(updated.controls)
        }

        if (scope.panDelta[0] || scope.panDelta[1]) {
            const updated = controls.orbit.pan({ controls: getOrbitControls(), camera, speed: panSpeed }, scope.panDelta)
            scope.panDelta = [0, 0]
            camera.position = updated.camera.position
            camera.target = updated.camera.target
        }

        if (scope.zoomDelta) {
            const updated = controls.orbit.zoom({ controls: getOrbitControls(), camera, speed: zoomSpeed }, scope.zoomDelta)
            updateOrbitControls(updated.controls)
            scope.zoomDelta = 0
        }
    }
}
