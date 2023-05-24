const AWS = require("aws-sdk");
const middy = require("../middlewares");
const { TABLE_NAME } = require("../constants");

const fetchTodos = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  let todos;

  try {
    const results = await dynamoDB.scan({ TableName: TABLE_NAME }).promise();
    todos = results.Items;
  } catch (error) {
    console.log({ error });
    return {
      statusCode: 500,
      body: {
        message: "Error fetching todos",
        error,
      },
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(todos),
  };
};

module.exports = {
  handler: middy(fetchTodos),
};
