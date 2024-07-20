import express from "express";
import prisma from "@repo/db/client";

const PORT = 3000;

const app = express();
app.use(express.json());


// TODO: add auth so only the user can access their own hooks
app.post("/hooks/catch/:userId/:mateId", async (req, res) => {
  const userId = req.params.userId;
  const mateId = req.params.mateId;
  const body = req.body;

  // store in db a new trigger
  // push that trigger on the/a queue
  await prisma.$transaction(async tx => {

    const run = await tx.mateRun.create({
      data: {
        mateId,
        metadata: body
      }
    });

    await tx.mateRunOutbox.create({
      data: {
        mateRunId: run.id,
      }
    });
  });

  return res.status(202).json({
    success: true,
    message: "Webhook received"

  });
});

app.listen(PORT, () => {
  console.log("listening on port: ", PORT);
});