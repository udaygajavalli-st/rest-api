import AWS from "aws-sdk";

const sqs = new AWS.SQS();

export async function main(event) {
  await sqs
    .sendMessage({
      // Get the queue url from the environment variable
      QueueUrl: process.env.queueUrl,
      MessageBody: event.body,
    })
    .promise();

  console.log("Message queued!");
  return {
    statusCode: 200,
    body: JSON.stringify({ status: "successful" }),
  };
}
