import {
  KeyboardTypeOptions,
  StyleProp,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import {Images, colors, ph, pw} from '../../themes'
import {CustomImage} from '../Image'

interface SearchBarProps {
  style?: StyleProp<TextStyle>
  value: string
  onChangeText?: (str: string) => void
  onIconRightPress?: () => void
  icon?: keyof typeof Images
  editable?: boolean
  keyboardType?: KeyboardTypeOptions
  showIcon?: boolean
}

const SearchBar = ({
  style,
  value,
  onChangeText,
  onIconRightPress,
  icon,
  editable,
  keyboardType,
  showIcon = true,
}: SearchBarProps) => {
  const iconRight = icon ?? 'icon_close'
  return (
    <View style={[styles.container, style]}>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, style]}
        editable={editable}
        keyboardType={keyboardType}
      />
      {showIcon && (
        <TouchableOpacity style={styles.position} onPress={onIconRightPress}>
          <CustomImage name={iconRight} style={styles.close} />
        </TouchableOpacity>
      )}
    </View>
  )
}

export default SearchBar

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: ph(5),
  },
  input: {
    width: '90%',
    backgroundColor: colors.sky,
    height: ph(40),
    borderRadius: pw(7),
    paddingHorizontal: pw(5),
  },
  close: {
    width: pw(15),
    height: pw(15),
    resizeMode: 'contain',
  },
  position: {
    position: 'absolute',
    right: pw(30),
  },
})
