const createElement = require('./element')
const designParameters = require('./parameters/web/designParameters')

module.exports = function (scope, callback) {
    createElement('parameters').appendChild(designParameters(
        {
            design: {
                parameterValues: scope.paramState,
                parameterDefinitions: scope.parameterDefinitions,
                parameterDefaults: scope.paramState
            }
        },
        { callback },
        (s) => s)
    )
}
