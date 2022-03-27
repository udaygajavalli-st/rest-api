import * as sst from "@serverless-stack/resources";

export default class MyStack extends sst.Stack {
  constructor(scope, id, props) {
    super(scope, id, props);

    //Create S3 Bucket
    const bucket = new sst.Bucket(this, "events");

    // Create Queue
    const queue = new sst.Queue(this, "Queue", {
      consumer: {
        handler: "src/consumer.main",
        environment: { bucketName: bucket.bucketName },
        permissions: [bucket],
      },
    });

    // Create a HTTP API
    const api = new sst.Api(this, "Api", {
      routes: {
        "POST /": {
          function: {
            srcPath: "src/",
            handler: "lambda.main",
            environment: { queueUrl: queue.sqsQueue.queueUrl },
            permissions: [queue],
          },
        },
      },
    });

    // Show the endpoint in the output
    this.addOutputs({
      ApiEndpoint: api.url,
      SQSUrl: queue.sqsQueue.queueUrl,
      S3Bucket: bucket.s3Bucket.bucketWebsiteUrl,
    });
  }
}
