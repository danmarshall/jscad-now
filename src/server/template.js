var model = require('<MODEL>');
var client = require('<CLIENT>');
client(model.main || model, model.getParameterDefinitions);
