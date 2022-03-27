import AWS from "aws-sdk";
const s3 = new AWS.S3();

export async function main(event) {
  // File name which you want to put in s3 bucket
  try {
    let msg = event.Records[0].body;
    msg = JSON.parse(msg);
    console.log(msg);
    const s3Bucket = process.env.bucketName;
    const objectName = msg.event + "_"+ msg.sg_event_id;
    const params = {
      Bucket: s3Bucket,
      Key: objectName,
      Body: JSON.stringify(msg),
      ContentType: "application/json",
    };
    const result = await s3.putObject(params).promise();
    console.log(result);
    console.log(`File uploaded successfully with name ` + objectName);
  } catch (err) {
    console.log(err);
  }

  return {};
}
