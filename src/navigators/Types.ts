import {ParamListBase} from '@react-navigation/native'
import RouteKey from './RouteKey'
// import {MovieI} from 'src/Store/types/movie'
export type KeyAppScreen = keyof typeof RouteKey
/** Type */

type MapScreenParams = {
  longitude: number
  latitude: number
}
export interface AppStackParamList extends ParamListBase {
  /** Params */
  [RouteKey.MapScreen]: MapScreenParams
}

export interface HomeTabParamList extends ParamListBase {
  /** Params */
}
