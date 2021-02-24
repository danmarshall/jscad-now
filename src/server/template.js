var model = require(MODEL);
var client = require(CLIENT);
client(SIZE, model.main || model, model.getParameterDefinitions);
