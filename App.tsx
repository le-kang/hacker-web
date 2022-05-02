import { SafeAreaView } from 'react-native'
import Constants from 'expo-constants'
import { NavigationContainer } from '@react-navigation/native'
import { TailwindProvider } from 'tailwind-rn'
import utilities from './tailwind.json'

import { AppNavigator } from './navigation'

export default function App() {
  return (
    <TailwindProvider utilities={utilities}>
      <SafeAreaView style={{ paddingTop: Constants.statusBarHeight, flex: 1 }}>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </SafeAreaView>
    </TailwindProvider>
  )
}
