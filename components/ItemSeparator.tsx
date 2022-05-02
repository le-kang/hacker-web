import { View } from 'react-native'
import { useTailwind } from 'tailwind-rn'

export default function ItemSeparator() {
  const tw = useTailwind()
  return <View style={tw('w-full bg-slate-300 h-px')} />
}
