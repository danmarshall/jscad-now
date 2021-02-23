const { pointerGestures } = require('most-gestures')
const { getOrbitControls, updateOrbitControls } = require('./controls')

module.exports = function (scope) {
    const { camera, container } = scope
    const gestures = pointerGestures(container)

    // rotate & pan
    gestures.drags
        .forEach((data) => {
            const ev = data.originalEvents[0]
            const { x, y } = data.delta
            const shiftKey = (ev.shiftKey === true) || (ev.touches && ev.touches.length > 2)
            if (shiftKey) {
                scope.panDelta[0] += x
                scope.panDelta[1] += y
            } else {
                scope.rotateDelta[0] -= x
                scope.rotateDelta[1] -= y
            }
        })

    // zoom
    gestures.zooms
        .forEach((x) => {
            scope.zoomDelta -= x
        })

    // auto fit
    gestures.taps
        .filter((taps) => taps.nb === 2)
        .forEach((x) => {
            const updated = controls.orbit.zoomToFit({ controls: getOrbitControls(), camera })
            updateOrbitControls(updated.controls)
        })
}