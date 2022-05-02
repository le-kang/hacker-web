import { TouchableOpacity, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useTailwind } from 'tailwind-rn'
import { formatDistanceToNow } from 'date-fns'

import type { StackParamList } from '../navigation'

type NewsListItemProps = {
  index: number
  id: number
  title: string
  time: Date
  external: boolean
}

export default function NewsListItem({
  index,
  id,
  title,
  time,
  external,
}: NewsListItemProps) {
  const navigation =
    useNavigation<NativeStackNavigationProp<StackParamList, 'NewsList'>>()
  const tw = useTailwind()

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('News', { id, title, external })}
    >
      <View style={tw('p-4 flex-row')}>
        <Text style={tw('w-8 text-xl font-bold text-slate-400')}>{index}</Text>
        <View style={tw('flex-1')}>
          <Text style={tw('text-lg text-blue-600')}>{title}</Text>
          <Text style={tw('text-sm text-stone-400')}>
            {formatDistanceToNow(time, { addSuffix: true })}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}
