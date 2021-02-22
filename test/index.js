function main (parameters) {
    const { colorize } = require('@jscad/modeling').colors
    const { cube, cuboid, line, sphere, star } = require('@jscad/modeling').primitives
    const { intersect, subtract } = require('@jscad/modeling').booleans

    const logo = [
        colorize([1.0, 0.4, 1.0], subtract(
            cube({ size: 300 }),
            sphere({ radius: 200 })
        )),
        colorize([1.0, 1.0, 0], intersect(
            sphere({ radius: 130 }),
            cube({ size: 210 })
        ))
    ]

    const transpCube = colorize([1, 0, 0, 0.75], cuboid({ size: [100 * parameters.scale, 100, 210 + (200 * parameters.scale)] }))
    const star2D = star({ vertices: 8, innerRadius: 150, outerRadius: 200 })
    const line2D = colorize([1.0, 0, 0], line([[220, 220], [-220, 220], [-220, -220], [220, -220], [220, 220]]))

    return [transpCube, line2D, star2D, ...logo]
}

module.exports = { main }
