import { Kafka } from "kafkajs";

const TOPIC_NAME = "mate-events";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"]
});

async function main() {
  const consumer = kafka.consumer({
    groupId: "main-worker"
  });
  await consumer.connect();

  await consumer.subscribe({ topic: TOPIC_NAME, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString()
      });

      await new Promise((resolve) => setTimeout(resolve, 5000));

      console.log("processing done");

      await consumer.commitOffsets([
        {
          topic: TOPIC_NAME,
          offset: (parseInt(message.offset) + 1).toString(),
          partition: partition
        }
      ]);
    },
    autoCommit: false
  });
}

main();