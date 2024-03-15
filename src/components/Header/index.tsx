import React from 'react'
import {StyleProp, StyleSheet, Text, View, ViewStyle} from 'react-native'
import {useNavigation} from '@react-navigation/native'
import {ButtonItemProps, ButtonGroup} from '../ButtonGroup'
import {pf, ph, pw} from '../../themes'

export interface HeaderProps {
  title: string
  iconLeft?: ButtonItemProps[]
  iconRight?: ButtonItemProps[]
  headerStyle?: StyleProp<ViewStyle>
  hasBack?: boolean
  onLeftPress?: () => void
}
export const Header = ({
  title = '',
  iconLeft,
  iconRight = [],
  headerStyle,
  hasBack = true,
  onLeftPress,
}: HeaderProps) => {
  const navigation = useNavigation()
  const backIcon: ButtonItemProps = {
    icon: 'icon_back',
    buttonStyle: styles.icon_back,
    onPress: onLeftPress ? () => onLeftPress() : () => navigation.goBack(),
  }
  return (
    <View style={styles.headerContainer}>
      <View style={{flex: 2}}>
        <ButtonGroup style={styles.leftView} item={hasBack ? iconLeft?.concat([backIcon]) : iconLeft} />
      </View>
      <View style={[styles.container, headerStyle]}>
        <Text style={[styles.header]}>{title} </Text>
      </View>
      <View style={{flex: 2}}>
        <ButtonGroup item={iconRight} style={styles.rightView} />
      </View>
    </View>
  )
}

export const styles = StyleSheet.create({
  header: {
    fontSize: pf(20),
    fontWeight: '700',
  },
  secondLeftIconRight: {
    width: pw(20),
    height: ph(20),
    marginLeft: pw(4),
  },
  firstLeftIonStyle: {
    width: pw(20),
    height: ph(20),
    marginLeft: pw(10),
  },
  icon_back: {
    width: pw(20),
    height: ph(20),
  },
  headerContainer: {
    width: '100%',
    height: ph(45),
    flexDirection: 'row',
  },
  leftView: {
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: pw(18),
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    marginRight: pw(11),
  },
  container: {
    flex: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
