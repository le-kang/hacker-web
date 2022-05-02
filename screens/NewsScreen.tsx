import { useLayoutEffect } from 'react'
import { TouchableWithoutFeedback, View, Text } from 'react-native'
import { WebView } from 'react-native-webview'
import type { NativeStackScreenProps } from '@react-navigation/native-stack'
import useSWR from 'swr'
import { useTailwind } from 'tailwind-rn'
import { MaterialCommunityIcons } from '@expo/vector-icons'

import { fetcher, getTotalCommentsCount } from '../utils'
import { newsItem } from '../schemas'
import type { StackParamList } from '../navigation'

export default function NewsScreen({
  route,
  navigation,
}: NativeStackScreenProps<StackParamList, 'News'>) {
  const tw = useTailwind()
  const { id, external } = route.params
  const { data } = useSWR(
    `http://api.hackerwebapp.com/item/${id}`,
    fetcher(newsItem)
  )

  useLayoutEffect(() => {
    if (!!data) {
      const numberOfComments = getTotalCommentsCount(data.comments)
      navigation.setOptions({
        headerRight: () => (
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate('Comments', { id: data.id })}
          >
            <View style={tw('flex-row items-center justify-center mx-2')}>
              <Text style={tw('mr-1 text-lg text-blue-600')}>
                {numberOfComments}
              </Text>
              <MaterialCommunityIcons
                name="comment-text-multiple"
                style={tw('text-blue-600 text-lg')}
              />
            </View>
          </TouchableWithoutFeedback>
        ),
      })
    }
  }, [navigation, data])

  if (external && !!data?.url) {
    return <WebView style={tw('flex-1')} source={{ uri: data.url }} />
  } else if (!!data?.content) {
    return (
      <WebView
        style={tw('flex-1')}
        originWhitelist={['*']}
        source={{ html: data.content }}
      />
    )
  }

  return null
}
