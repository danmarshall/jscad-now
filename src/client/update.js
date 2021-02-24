const { cameras, prepareRender } = require('@jscad/regl-renderer')
const { orbit } = require('@jscad/regl-renderer').controls
const getRenderOptions = require('./renderoptions')
const doRotatePanZoom = require('./panzoom')

module.exports = function (scope, size) {
    const render = prepareRender(getRenderOptions(scope, size))

    const updateAndRender = () => {
        doRotatePanZoom(scope)

        const {camera, container, controls} = scope
        const updated = orbit.update({ controls, camera })
        scope.updateOrbitControls(updated.controls)
        camera.position = updated.camera.position

        const pixelRatio = window.devicePixelRatio || 1
        const bounds = container.getBoundingClientRect()
    
        const width = (bounds.right - bounds.left) * pixelRatio
        const height = (bounds.bottom - bounds.top) * pixelRatio
    
        const prevWidth = container.width
        const prevHeight = container.height
    
        if (prevWidth !== width || prevHeight !== height) {
            container.width = width
            container.height = height
    
            cameras.perspective.setProjection(camera, camera, { width, height })
        }
        cameras.perspective.update(camera, camera)

        render(getRenderOptions(scope, size))
        window.requestAnimationFrame(updateAndRender)
    }
    window.requestAnimationFrame(updateAndRender)
}
