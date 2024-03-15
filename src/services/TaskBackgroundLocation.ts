import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'
import {LocationActivityType} from 'expo-location'
import {DatabaseRef} from './index'
import {store} from '../store'
export const LOCATION_TASK_NAME = 'background-location-task'
export const pushToFirebase = (location: any) =>
  DatabaseRef.set(location).then(() => console.log('Data updated.'))

export const startLocationUpdate = async () => {
  const {status: foregroundStatus} = await Location.requestForegroundPermissionsAsync()

  if (foregroundStatus === 'granted') {
    const {status: backgroundStatus} = await Location.requestBackgroundPermissionsAsync()
    if (backgroundStatus === 'granted') {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.Highest,
        activityType: LocationActivityType.Fitness,
        showsBackgroundLocationIndicator: true,
        foregroundService: {
          notificationTitle: 'Background Location',
          notificationBody: 'This is a background location notification',
        },
        timeInterval: store.getState().app.timeRecord,
        distanceInterval: 0,
      })
    }
  }
}

export const stopLocationUpdate = async () => {
  const isHas = await Location.hasStartedLocationUpdatesAsync(LOCATION_TASK_NAME)
  if (isHas) {
    await TaskManager.unregisterTaskAsync(LOCATION_TASK_NAME)
  }
}

export const caculateDistance = (la1: number, lo1: number, la2: number, lo2: number): number => {
  const R = 6371
  const dLat = (la2 - la1) * (Math.PI / 180)
  const dLon = (lo2 - lo1) * (Math.PI / 180)
  const la1ToRad = la1 * (Math.PI / 180)
  const la2ToRad = la2 * (Math.PI / 180)
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(la1ToRad) * Math.cos(la2ToRad) * Math.sin(dLon / 2) * Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const d = R * c
  return d
}
