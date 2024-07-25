import { Kafka } from "kafkajs";
import prisma from "@repo/db/client";

const kafka = new Kafka({
  clientId: "outbox-processor",
  brokers: ["localhost:9092"]
});

async function main() {
  const producer = kafka.producer();
  await producer.connect();
  while (1) {
    const pendingRows = await prisma.mateRunOutbox.findMany({
      take: 10
    });


    await producer.send({
      topic: "mate-events",
      messages: pendingRows.map((row) => {
        return {
          value: "test",
        };
      })
    });

    await prisma.mateRunOutbox.deleteMany({
      where: {
        id: {
          in: pendingRows.map(r => r.id)
        }
      }
    });
  }
}

main();