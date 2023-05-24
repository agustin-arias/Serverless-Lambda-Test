const AWS = require("aws-sdk");
const { TABLE_NAME } = require("../constants");
const middy = require("../middlewares");

const fetchTodos = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { completed } = event.body;
  const { id } = event.pathParameters;

  await dynamoDB
    .update({
      TableName: TABLE_NAME,
      Key: {
        id,
      },
      UpdateExpression: "set completed = :completed",
      ExpressionAttributeValues: {
        ":completed": completed,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();
  return {
    statusCode: 200,
    body: JSON.stringify({ msg: "Todo Updated" }),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

module.exports = {
  handler: middy(fetchTodos),
};
