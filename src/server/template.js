var model = require(MODEL);
var client = require(CLIENT);
client(GRIDSIZE, model.main || model, model.getParameterDefinitions);
