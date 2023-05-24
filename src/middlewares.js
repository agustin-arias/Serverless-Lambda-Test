const middy = require("@middy/core");
const httpJsonBodyParser = require("@middy/http-json-body-parser");

module.exports = (handler) => middy(handler).use(httpJsonBodyParser());
