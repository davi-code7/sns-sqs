import AWS from "../../config/aws/config";

export default function getQueueAttributes(queueUrl: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const queueAttributes = new AWS.SQS({
        apiVersion: process.env.AWS_API_VERSION,
      })
        .getQueueAttributes({
          QueueUrl: queueUrl,
          AttributeNames: ["QueueArn"],
        })
        .promise();

      queueAttributes
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
        });
    } catch (e) {
      reject(e);
    }
  });
}
