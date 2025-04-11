import { z } from "zod"
import { completionSchema } from "../schemas/completion"

export type OpenAICompletion = z.infer<typeof completionSchema>
