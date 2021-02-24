const jscadModeling = require('@jscad/modeling')

function main(parameters) {
    let { scale, size } = parameters;
    const { colorize } = jscadModeling.colors
    const { cube, cuboid, line, sphere, star } = jscadModeling.primitives
    const { intersect, subtract } = jscadModeling.booleans

    const logo = [
        colorize([1.0, 0.4, 1.0], subtract(
            cube({ size }),
            sphere({ radius: 200 })
        )),
        colorize([1.0, 1.0, 0], intersect(
            sphere({ radius: 130 }),
            cube({ size: 210 })
        ))
    ]

    const transpCube = colorize([1, 0, 0, 0.75], cuboid({ size: [100 * scale, 100, 210 + (200 * scale)] }))
    const star2D = star({ vertices: 8, innerRadius: 150, outerRadius: 200 })
    const line2D = colorize([1.0, 0, 0], line([[220, 220], [-220, 220], [-220, -220], [220, -220], [220, 220]]))

    return [transpCube, line2D, star2D, ...logo]
}

function getParameterDefinitions() {
    return [
        {name: 'size', caption: 'size of outer box:', type: 'float', initial: 300},
        {name: 'scale', caption: 'Scale of inner box:', type: 'slider', initial: 1, min: 0, max: 5},
    ];
}

module.exports = { main, getParameterDefinitions }
