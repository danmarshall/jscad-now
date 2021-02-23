const { cameras, entitiesFromSolids } = require('@jscad/regl-renderer')
const { orbit } = require('@jscad/regl-renderer').controls
const prepareGestures = require('./gestures')
const createElement = require('./element')
const update = require('./update')

module.exports = function (model, getParameterDefinitions) {

  const getSolids = () => {
    //TODO getParameterDefinitions
    return entitiesFromSolids({}, model({ scale: 1 }))
  }

  // prepare the camera
  const scope = {
    solids: getSolids(),
    camera: Object.assign({}, cameras.perspective.defaults),
    rotateDelta: [0, 0],
    panDelta: [0, 0],
    zoomDelta: 0,
    container: createElement(),
    controls: orbit.defaults,
    updateOrbitControls: (updated) => {
      scope.controls = { ...scope.controls, ...updated }
    }
  }

  // prepare
  prepareGestures(scope)

  //draw loop
  update(scope)
}
