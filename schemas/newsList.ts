import { z } from 'zod'

export const newsList = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    time: z.preprocess((arg) => {
      if (typeof arg === 'number') return new Date(arg * 1000)
    }, z.date()),
    type: z.string(),
    domain: z.string().optional(),
    url: z.string(),
  })
)

export type NewsList = z.infer<typeof newsList>
