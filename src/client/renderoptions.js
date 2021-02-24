const { drawCommands } = require('@jscad/regl-renderer')

module.exports = function (scope, size) {
    const { camera, container, entities } = scope
    return {
        glOptions: { container },
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
                size,
                ticks: [10, 1]
            },
            {
                visuals: {
                    drawCmd: 'drawAxis',
                    show: true
                }
            },
            ...entities
        ]
    }
}
