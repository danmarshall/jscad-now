const { controls, prepareRender, drawCommands, cameras, entitiesFromSolids } = require('@jscad/regl-renderer')
const pointerGestures = require('most-gestures').pointerGestures;

function client(model) {
  let orbitControls = controls.orbit.defaults

  const rotateSpeed = 0.002
  const panSpeed = 1
  const zoomSpeed = 0.08

  let rotateDelta = [0, 0]
  let panDelta = [0, 0]
  let zoomDelta = 0

  const el = document.createElement('div')
  el.setAttribute('style', 'height:100%')
  document.body.appendChild(el)

  // process entities and inject extras
  const solids = entitiesFromSolids({}, model({ scale: 1 }))

  // prepare the camera
  const perspectiveCamera = cameras.perspective
  const camera = Object.assign({}, perspectiveCamera.defaults)

  const options = {
    glOptions: { container: el },
    camera,
    drawCommands: {
      // draw commands bootstrap themselves the first time they are run
      drawGrid: drawCommands.drawGrid,
      drawAxis: drawCommands.drawAxis,
      drawMesh: drawCommands.drawMesh
    },
    // data
    entities: [
      { // grid data
        // the choice of what draw command to use is also data based
        visuals: {
          drawCmd: 'drawGrid',
          show: true,
          color: [0, 0, 0, 1],
          subColor: [0, 0, 1, 0.5],
          fadeOut: false,
          transparent: true
        },
        size: [500, 500],
        ticks: [10, 1]
      },
      {
        visuals: {
          drawCmd: 'drawAxis',
          show: true
        }
      },
      ...solids
    ]
  }
  // prepare
  const render = prepareRender(options)

  const gestures = pointerGestures(el)

  // rotate & pan
  gestures.drags
    .forEach((data) => {
      const ev = data.originalEvents[0]
      const { x, y } = data.delta
      const shiftKey = (ev.shiftKey === true) || (ev.touches && ev.touches.length > 2)
      if (shiftKey) {
        panDelta[0] += x
        panDelta[1] += y
      } else {
        rotateDelta[0] -= x
        rotateDelta[1] -= y
      }
    })

  // zoom
  gestures.zooms
    .forEach((x) => {
      zoomDelta -= x
    })

  // auto fit
  gestures.taps
    .filter((taps) => taps.nb === 2)
    .forEach((x) => {
      const updated = controls.orbit.zoomToFit({ controls: orbitControls, camera, entities: prevEntities })
      orbitControls = { ...orbitControls, ...updated.controls }
    })

  const doRotatePanZoom = () => {
    if (rotateDelta[0] || rotateDelta[1]) {
      const updated = controls.orbit.rotate({ controls: orbitControls, camera, speed: rotateSpeed }, rotateDelta)
      rotateDelta = [0, 0]
      orbitControls = { ...orbitControls, ...updated.controls }
    }

    if (panDelta[0] || panDelta[1]) {
      const updated = controls.orbit.pan({ controls: orbitControls, camera, speed: panSpeed }, panDelta)
      panDelta = [0, 0]
      camera.position = updated.camera.position
      camera.target = updated.camera.target
    }

    if (zoomDelta) {
      const updated = controls.orbit.zoom({ controls: orbitControls, camera, speed: zoomSpeed }, zoomDelta)
      orbitControls = { ...orbitControls, ...updated.controls }
      zoomDelta = 0
    }
  }



  const updateAndRender = () => {
    doRotatePanZoom()

    const updated = controls.orbit.update({ controls: orbitControls, camera })
    orbitControls = { ...orbitControls, ...updated.controls }
    camera.position = updated.camera.position

    perspectiveCamera.update(camera, camera)
    options.camera = camera

    resize(el)
    render(options)
    window.requestAnimationFrame(updateAndRender)
  }
  window.requestAnimationFrame(updateAndRender)

  const resize = (viewerElement) => {
    const pixelRatio = window.devicePixelRatio || 1
    const bounds = viewerElement.getBoundingClientRect()

    const width = (bounds.right - bounds.left) * pixelRatio
    const height = (bounds.bottom - bounds.top) * pixelRatio

    const prevWidth = viewerElement.width
    const prevHeight = viewerElement.height

    if (prevWidth !== width || prevHeight !== height) {
      viewerElement.width = width
      viewerElement.height = height

      perspectiveCamera.setProjection(camera, camera, { width, height })
      perspectiveCamera.update(camera, camera)
    }
  }
}

module.exports = client