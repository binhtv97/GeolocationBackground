/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'
import {Provider} from 'react-redux'
import {persistor, store} from './src/store'
import {PersistGate} from 'redux-persist/integration/react'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import AppNavigation from './src/navigators/AppNavigator'

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <AppNavigation />
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  )
}

export default App
