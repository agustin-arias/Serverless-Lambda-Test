const AWS = require("aws-sdk");
const middy = require("../middlewares");
const { TABLE_NAME } = require("../constants");
const { v4 } = require("uuid");

const addTodo = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { todo } = event.body;
  const createdAt = new Date().toISOString();
  const id = v4();

  const newTodo = {
    createdAt,
    completed: false,
    todo,
  };

  await dynamoDB
    .put({
      TableName: TABLE_NAME,
      Item: newTodo,
    })
    .promise();

  return {
    statusCode: 200,
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

module.exports = {
  handler: middy(addTodo),
};
