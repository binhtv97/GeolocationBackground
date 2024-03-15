import React from 'react'
import {Keyboard, Pressable, SafeAreaView, StyleProp, View, ViewStyle, StyleSheet} from 'react-native'
import {Header} from '../Header'
import {ButtonItemProps} from '../ButtonGroup'
import {colors} from '../../themes'

export interface LayOut {
  isFullScreen?: boolean
  isShowHeader?: boolean
  children: React.ReactNode
  style?: StyleProp<ViewStyle>
  titileHeader: string
  hasBack?: boolean
  headerStyle?: StyleProp<ViewStyle>
  iconRight?: ButtonItemProps[]
  iconLeft?: ButtonItemProps[]
  onLeftPress?: () => void
  isRequireDismisKeybarod?: boolean
}

const LayOut = ({
  isFullScreen = false,
  isShowHeader = true,
  children,
  style,
  titileHeader = '',
  hasBack = true,
  headerStyle = {},
  iconRight = [],
  iconLeft = [],
  onLeftPress,
  isRequireDismisKeybarod = false,
}: LayOut) => {
  const renderBody = () => (
    <View style={[styles.flex]}>
      {isShowHeader && (
        <Header
          title={titileHeader}
          iconLeft={iconLeft}
          iconRight={iconRight}
          headerStyle={headerStyle}
          hasBack={hasBack}
          onLeftPress={onLeftPress}
        />
      )}
      <View style={[styles.flex, style]}>{children}</View>
    </View>
  )

  if (isFullScreen) {
    return <View style={[styles.container]}>{renderBody()}</View>
  }
  return (
    <SafeAreaView style={[styles.container]}>
      {isRequireDismisKeybarod ? (
        <Pressable style={{flex: 1}} onPress={() => Keyboard.dismiss()}>
          {renderBody()}
        </Pressable>
      ) : (
        renderBody()
      )}
    </SafeAreaView>
  )
}

export default LayOut

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: sizes.PADDING,
    backgroundColor: colors.white,
  },
  flex: {
    flex: 1,
  },
})
