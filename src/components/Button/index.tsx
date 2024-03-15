import React, {useCallback} from 'react'
import {
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Text,
  StyleProp,
  ViewStyle,
  TextStyle,
  ImageStyle,
  View,
} from 'react-native'
import {Images, ph, pw} from '../../themes'
import {CustomImage} from '../Image'
interface LabelProps {
  text: string
  style?: StyleProp<TextStyle>
}

export interface CustomButtonProps {
  style?: StyleProp<ViewStyle>
  label?: LabelProps[]
  onPress?: () => void
  loading?: boolean
  disabled?: boolean
  isDefault?: boolean
  color?: string
  textStyle?: StyleProp<TextStyle>
  icon?: keyof typeof Images
  iconStyle?: StyleProp<ImageStyle>
  position?: 'left' | 'right' | undefined
  description?: string
}
export const CustomButton = ({
  style,
  label,
  onPress,
  loading = false,
  disabled = false,
  isDefault = true,
  color = '#32AEA6',
  textStyle,
  icon,
  iconStyle,
  position,
  description,
}: CustomButtonProps) => {
  const defaultStyle = isDefault
    ? [styles.container, {backgroundColor: color}, style, disabled && {backgroundColor: '#B6B4B2'}]
    : [style]
  // eslint-disable-next-line arrow-body-style
  const contentRender = useCallback(() => {
    return (
      <>
        {position === 'left' && icon && <CustomImage name={icon} style={iconStyle} resizeMode={'contain'} />}
        <Text style={[textStyle]}>
          {' '}
          {Array.isArray(label)
            ? label.map((item, index) => (
                <Text key={`lb-${index}`} style={[item.style]}>
                  {item.text}{' '}
                </Text>
              ))
            : null}
        </Text>
        {position === 'right' && icon && <CustomImage name={icon} style={iconStyle} resizeMode={'contain'} />}
      </>
    )
  }, [label, textStyle, icon, iconStyle, position])

  return (
    <TouchableOpacity style={defaultStyle} onPress={onPress} disabled={disabled}>
      {loading ? (
        <ActivityIndicator color="white" />
      ) : description ? (
        <View style={styles.footerContainer}>
          <View style={styles.footerImg}>
            {icon && <CustomImage name={icon} style={iconStyle} resizeMode={'contain'} />}
          </View>
          <View style={styles.footerText}>
            {Array.isArray(description) && <Text style={description[0].style}>{description[0].text}</Text>}
          </View>
        </View>
      ) : (
        <View style={styles.children}>{contentRender()}</View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    height: ph(40),
    borderRadius: pw(30),
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  footerText: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerImg: {
    width: '100%',
    height: '70%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  footerContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  children: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
