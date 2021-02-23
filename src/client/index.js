const { controls, prepareRender, cameras, entitiesFromSolids } = require('@jscad/regl-renderer')
const resize = require('./resize')
const { getOrbitControls, updateOrbitControls } = require('./controls')
const prepareGestures = require('./gestures')
const preparePanZoom = require('./panzoom')
const getRenderOptions = require('./renderoptions')
const createElement = require('./element')

module.exports = function (model, getParameterDefinitions) {

  // process entities and inject extras
  const solids = entitiesFromSolids({}, model({ scale: 1 }))

  // prepare the camera
  const scope = {
    camera: Object.assign({}, cameras.perspective.defaults),
    rotateDelta: [0, 0],
    panDelta: [0, 0],
    zoomDelta: 0,
    container: createElement()
  }

  // prepare
  const render = prepareRender(getRenderOptions(scope, solids))
  prepareGestures(scope)
  const doRotatePanZoom = preparePanZoom(scope)

  const updateAndRender = () => {
    doRotatePanZoom()

    const updated = controls.orbit.update({ controls: getOrbitControls(), camera: scope.camera })
    updateOrbitControls(updated.controls)
    scope.camera.position = updated.camera.position

    cameras.perspective.update(scope.camera, scope.camera)

    resize(scope)
    render(getRenderOptions(scope, solids))
    window.requestAnimationFrame(updateAndRender)
  }
  window.requestAnimationFrame(updateAndRender)

}
