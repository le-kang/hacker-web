import { FlatList } from 'react-native'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import useSWR from 'swr'
import { useTailwind } from 'tailwind-rn'

import { fetcher } from '../utils'
import { newsItem } from '../schemas'
import { CommentItem, ItemSeparator } from '../components'
import type { StackParamList } from '../navigation'

export default function CommentsScreen({
  route,
}: NativeStackScreenProps<StackParamList, 'Comments'>) {
  const tw = useTailwind()
  const { id } = route.params
  const { data } = useSWR(
    `http://api.hackerwebapp.com/item/${id}`,
    fetcher(newsItem)
  )

  return (
    <FlatList
      data={data?.comments}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <CommentItem
          author={item.user}
          time={item.time}
          content={item.content}
          replies={item.comments}
        />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}
