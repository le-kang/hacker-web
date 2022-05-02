import { ZodSchema } from 'zod'

export function fetcher<T>(schema: ZodSchema<T>) {
  return async (input: RequestInfo, init?: RequestInit) => {
    const res = await fetch(input, init)
    const parsed = schema.safeParse(await res.json())
    return parsed.success ? parsed.data : null
  }
}
