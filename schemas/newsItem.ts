import { z } from 'zod'

export type Comment = {
  id: number
  time: Date
  user: string
  content: string
  comments: Comment[]
}

const newsComment: z.ZodType<Comment> = z.lazy(() =>
  z.object({
    id: z.number(),
    time: z.preprocess((arg) => {
      if (typeof arg === 'number') return new Date(arg * 1000)
    }, z.date()),
    user: z.string(),
    content: z.string(),
    comments: z.array(newsComment),
  })
)

export const newsItem = z.object({
  id: z.number(),
  content: z.string().optional(),
  url: z.string().url().optional(),
  comments: z.array(newsComment),
})

export type NewsItem = z.infer<typeof newsItem>
