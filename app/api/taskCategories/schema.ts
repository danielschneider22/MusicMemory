import { z } from 'zod';

const taskCategorySchema = z.object({
    name: z.string(),
    position: z.number().int()
})

export default taskCategorySchema;