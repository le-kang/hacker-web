import type { Comment } from '../schemas'

export const getTotalCommentsCount = (newsComments: Comment[]): number =>
  newsComments.reduce(
    (total, curr) =>
      total +
      (curr.comments.length > 0 ? getTotalCommentsCount(curr.comments) : 0),
    newsComments.length
  )
