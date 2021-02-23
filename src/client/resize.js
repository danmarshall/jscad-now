const { cameras } = require('@jscad/regl-renderer')

module.exports = function (scope) {
    const { camera, container } = scope;
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
        cameras.perspective.update(camera, camera)
    }
}
