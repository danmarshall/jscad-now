const { cameras, entitiesFromSolids } = require('@jscad/regl-renderer')
const { orbit } = require('@jscad/regl-renderer').controls
const prepareGestures = require('./gestures')
const createElement = require('./element')
const update = require('./update')
const getParameterValuesFromParameters = require('./parameters/core/getParameterValuesFromParameters')
const getParameterValuesFromUIControls = require('./parameters/core/getParameterValuesFromUIControls')
const getControls = require('./parameters/web/getControls')
const prepareParameterInputs = require('./inputs')
const prepareDownloadButtons = require('./download')
const injectStyle = require('./style')

injectStyle()

module.exports = function (gridsize, model, getParameterDefinitions) {

  const getEntities = (params) => {
    return entitiesFromSolids({}, model(params))
  }
  
  // prepare the camera
  const scope = {
    model,
    gridsize,
    parameterDefinitions: null,
    paramState: {},
    entities: null,
    camera: Object.assign({}, cameras.perspective.defaults),
    rotateDelta: [0, 0],
    panDelta: [0, 0],
    zoomDelta: 0,
    container: createElement('regl-renderer'),
    controls: orbit.defaults,
    updateOrbitControls: (updated) => {
      scope.controls = { ...scope.controls, ...updated }
    }
  }

  // on refresh store the current camera position
  window.addEventListener('beforeunload', () => {
    if (!window.skipCamera) {
      window.localStorage.setItem('jscad-now-camera', scope.camera.position)
    }
  });

  savedCameraPosition = window.localStorage.getItem('jscad-now-camera') || null

  if (savedCameraPosition != null) {
    scope.camera.position = savedCameraPosition.split(",").map(function (x) { return parseInt(x, 10); });
    console.log(`restored camera position: ${scope.camera.position}`)
  }

  if (getParameterDefinitions) {
    scope.parameterDefinitions = getParameterDefinitions()
    scope.paramState = getParameterValuesFromParameters(scope.parameterDefinitions)
    scope.entities = getEntities(scope.paramState)
  }

  // prepare
  prepareGestures(scope)
  prepareParameterInputs(scope, () => {
    scope.paramState = getParameterValuesFromUIControls(getControls(), scope.parameterDefinitions)
    scope.entities = getEntities(scope.paramState)
  })
  prepareDownloadButtons(scope)


  //draw loop
  update(scope)
}

