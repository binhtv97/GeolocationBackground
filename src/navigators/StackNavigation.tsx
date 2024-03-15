import {createNativeStackNavigator} from '@react-navigation/native-stack'
import React from 'react'
import RouteKey from './RouteKey'
import {AppStackParamList, HomeTabParamList} from './types'
import MapScreen from '../screens/MapScreen'
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import {Animated} from 'react-native'
import LocationScreen from '../screens/LocationScreen'
import SettingScreen from '../screens/SettingScreen'

const Stack = createNativeStackNavigator<AppStackParamList>()
const HomeTab = createBottomTabNavigator<HomeTabParamList>()

const HomeStack = props => (
  <Animated.View
    style={{
      flex: 1,
      backgroundColor: 'white',
    }}>
    <HomeTab.Navigator
      screenOptions={{
        headerShown: false,
        unmountOnBlur: true,
      }}>
      <HomeTab.Screen name="Setting" component={SettingScreen} />
      <HomeTab.Screen name="Location" component={LocationScreen} />
    </HomeTab.Navigator>
  </Animated.View>
)
export const MainNavigator = () => (
  <Stack.Navigator
    initialRouteName={RouteKey.HomeScreen}
    screenOptions={{
      headerShown: false,
    }}>
    <Stack.Screen name={RouteKey.HomeStack} options={{gestureEnabled: false}}>
      {props => <HomeStack />}
    </Stack.Screen>
    <Stack.Screen name={RouteKey.MapScreen} component={MapScreen} />
  </Stack.Navigator>
)
