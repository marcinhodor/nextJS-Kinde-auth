import { z } from "zod"
import { messageSchema } from "../schemas/message"

export type OpenAIMessage = z.infer<typeof messageSchema>
