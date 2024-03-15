import {View} from 'react-native'
import React from 'react'
import {ph, pw} from '../../themes'

export interface SpaceProps {
  width?: number
  height?: number
}
export const Space = ({width, height}: SpaceProps) => {
  if (!width && !height) {
    return null
  }
  const scaleWidth = pw(width ?? 0)
  const scaleHeight = ph(height ?? 0)

  return (
    <View
      style={{
        width: scaleWidth,
        height: scaleHeight,
      }}
    />
  )
}
