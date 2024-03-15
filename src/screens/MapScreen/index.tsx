import {StyleSheet} from 'react-native'
import React, {PropsWithChildren} from 'react'
import {GoogleMap} from '../../components/Maps'
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {AppStackParamList} from '../../navigators/Types'
import RouteKey from '../../navigators/RouteKey'
import LayOut from '../../components/Layout'

export interface MapScreenProps {
  longitude: number
  latitude: number
}
type Props = NativeStackScreenProps<AppStackParamList, RouteKey.MapScreen> & PropsWithChildren
const MapScreen: React.FC<Props> = props => (
  <LayOut titileHeader="GOOGLE SCREEN">
    <GoogleMap
      defaultLocation={{
        latitude: props.route.params.latitude,
        longitude: props.route.params.longitude,
      }}
    />
  </LayOut>
)

export default MapScreen

const styles = StyleSheet.create({})
