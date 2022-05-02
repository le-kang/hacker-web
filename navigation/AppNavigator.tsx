import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { NewsListScreen, NewsScreen, CommentsScreen } from '../screens'
import type { Comment } from '../schemas'

export type StackParamList = {
  NewsList: undefined
  News: {
    id: number
    title: string
    external: boolean
  }
  Comments: {
    id: number
  }
}

const Stack = createNativeStackNavigator<StackParamList>()

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="NewsList">
      <Stack.Screen
        name="NewsList"
        component={NewsListScreen}
        options={{ title: 'News List' }}
      />
      <Stack.Screen
        name="News"
        component={NewsScreen}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
      <Stack.Screen
        name="Comments"
        component={CommentsScreen}
        options={{ title: 'Comments' }}
      />
    </Stack.Navigator>
  )
}
