import { z } from 'zod';

const taskSchema = z.object({
    description: z.string(),
    complete: z.boolean(),
    taskCategoryId: z.number(),
    userId: z.string()
})

export default taskSchema;