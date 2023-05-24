const AWS = require("aws-sdk");
const middy = require("../middlewares");
const { TABLE_NAME } = require("../constants");

const fetchTodo = async (event) => {
  const dynamoDB = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;

  let todo;

  try {
    const result = await dynamoDB
      .get({ TableName: TABLE_NAME, Key: { id } })
      .promise();

    todo = result.Item;
  } catch (error) {
    console.log({ error });

    return {
      statusCode: 500,
      body: {
        message: "Error fetching todo",
        error,
      },
      headers: {
        "Content-Type": "application/json",
      },
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify(todo),
    headers: {
      "Content-Type": "application/json",
    },
  };
};

module.exports = {
  handler: middy(fetchTodo),
};
