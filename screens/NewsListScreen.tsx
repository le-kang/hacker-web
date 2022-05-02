import { FlatList, View } from 'react-native'
import useSWR from 'swr'
import { useTailwind } from 'tailwind-rn'

import { fetcher } from '../utils'
import { newsList } from '../schemas'
import { NewsListItem, ItemSeparator } from '../components'

export default function NewsListScreen() {
  const tw = useTailwind()
  const { data } = useSWR('http://api.hackerwebapp.com/news', fetcher(newsList))

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item, index }) => (
        <NewsListItem
          index={index + 1}
          id={item.id}
          title={item.title}
          time={item.time}
          external={!!item.domain}
        />
      )}
      ItemSeparatorComponent={ItemSeparator}
    />
  )
}
