import { z } from "zod";
export const mateSchema = z.object({
  availableTriggerId: z.string({ message: "Invalid trigger id" }),
  triggerMetaData: z.any().optional(),
  actions: z.array(z.object({
    availableActionId: z.string({ message: "Invalid action id" }),
    actionMetaData: z.any().optional()
  }))
});
