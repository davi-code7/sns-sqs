import AWS from "../../config/aws/config";
import { standartazeTopicName } from "../../utils/validators";
import { ICreateTopicReturn } from "../../interfaces/controllers/sns";

export default function getTopic(
  topicName: string
): Promise<ICreateTopicReturn> {
  const sdTopicName: string = standartazeTopicName(topicName);

  return new Promise((resolve, reject) => {
    try {
      const listTopics = new AWS.SNS({ apiVersion: process.env.AWS_API_VERSION })
        .listTopics({})
        .promise();

      listTopics
        .then((data) => {
          if (data.Topics && typeof data.Topics && data.Topics.length > 0) {
            data.Topics.forEach((topic) => {
              if (topic.TopicArn.split(":")[5] === sdTopicName) {
                resolve(topic);
              }
            });
          } else {
            resolve(undefined);
          }
        })
        .catch((err) => {
          reject(err);
        });
    } catch (e) {
      reject(e);
    }
  });
}
