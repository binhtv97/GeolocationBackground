import {DarkTheme, NavigationContainer} from '@react-navigation/native'
import React from 'react'
import {navigationRef} from './RootNavigation'
import {MainNavigator} from './StackNavigation'
import {colors} from '../themes'
import * as TaskManager from 'expo-task-manager'
import database from '@react-native-firebase/database'
import {LOCATION_TASK_NAME, caculateDistance} from '../services'
import NotifService from '../notification/NotifService'
import {store} from '../store'
import {appActions} from '../store/reducers'

TaskManager.defineTask(LOCATION_TASK_NAME, ({data, error}) => {
  if (error) {
    console.log(error)
    // Error occurred - check `error.message` for more details.
    return
  }
  if (data) {
    const {locations} = data as any
    if (locations && locations[0] && locations[0].timestamp) {
      const currentLongitude = locations[0].coords.longitude
      const currentLatitude = locations[0].coords.latitude
      const currentTimestame = new Date().getTime()
      const now = new Date(locations[0].timestamp).toISOString()

      database()
        .ref('/tracking')
        .limitToLast(1)
        .once('value')
        .then(e => {
          const result = Object.values(e.val()).map((l: any) => ({
            latitude: l?.coords?.latitude ?? 0,
            longitude: l?.coords?.longitude ?? 0,
            timestame: l?.timestamp ?? 0,
          }))
          const lastLongitude = result[0].longitude
          const lastLatitude = result[0].latitude
          const timestame = result[0].timestame
          const distance = caculateDistance(currentLatitude, currentLongitude, lastLatitude, lastLongitude)
          if (distance > 0.2) {
            database()
              .ref(`/tracking/${now.replace('.', '_')}`)
              .set(locations[0])
              .then(() =>
                console.log('Data updated.', lastLatitude - currentLatitude, currentLatitude - lastLatitude),
              )
          }

          const allowNotifi = store.getState().app.sendNotification
          if (currentTimestame - timestame > 10 * 60 * 1000 && allowNotifi) {
            const onRegister = () => {}
            const onNitification = () => {
              console.log('click into notification')

              store.dispatch(appActions.changeNotifiStatus(false))
            }
            new NotifService(onRegister, onNitification).localNotif(null, 'LONG TIME DONT MOVE', '')
          }
        })
      // console.log(locations)

      // database()
      //   .ref(`/tracking/${now.replace('.', '_')}`)
      //   .set(locations[0])
      //   .then(() =>
      //     console.log('Data updated.', locations[0].coords.longitude, locations[0].coords.longitude),
      //   )
      // console.log('Data updated.', locations[0].coords.longitude, locations[0].coords.latitude)
    }
  }
})

function AppNavigation(): React.ReactElement {
  function renderStack(): React.ReactNode {
    return <MainNavigator />
  }

  return (
    <NavigationContainer
      theme={{
        dark: true,
        colors: {
          ...DarkTheme.colors,
          background: colors.transparent,
        },
      }}
      ref={navigationRef}>
      {renderStack()}
    </NavigationContainer>
  )
}

export default AppNavigation
