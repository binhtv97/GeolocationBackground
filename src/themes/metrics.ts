import {Dimensions, Platform} from 'react-native'
import {IHitSlop, IShadow} from './types'

const DESIGN_WIDTH = 375
const DESIGN_HEIGHT = 812
const {width, height} = Dimensions.get('window')

function responsiveWidth<T extends number>(value: T) {
  return ((width * value) / DESIGN_WIDTH) as T
}

function responsiveHeight<T extends number>(value: T) {
  return ((height * value) / DESIGN_HEIGHT) as T
}

function responsiveFont<T extends number>(value: T) {
  return ((width * value) / DESIGN_WIDTH) as T
}

function deviceWidth(): number {
  return width
}

function deviceHeight(): number {
  return height
}

const isIOS: boolean = Platform.OS === 'ios'

const shadow: IShadow = {
  shadowColor: '#000',
  shadowRadius: 5,
  elevation: 5,
  shadowOpacity: 0.2,
  shadowOffset: {width: 0, height: 3},
}
const hitSlop: IHitSlop = {
  top: 10,
  bottom: 10,
  right: 10,
  left: 10,
}

const metrics = {
  // Text Size
  title2: responsiveFont(32),
  title: responsiveFont(20),
  defaultFont: responsiveFont(16),
  span: responsiveFont(14),

  // spacing
  tiny: responsiveHeight(4),
  positionCamera: responsiveHeight(6),
  xxs: responsiveHeight(8),
  xs: responsiveHeight(12),
  small: responsiveHeight(16),
  sMedium: responsiveHeight(18),
  medium: responsiveHeight(20),
  large: responsiveHeight(24),
  xl: responsiveHeight(28),
  xxl: responsiveHeight(32),
  huge: responsiveHeight(48),
  massive: responsiveHeight(64),
  enormous: responsiveHeight(72),

  borderRadiusTiny: responsiveHeight(2),
  borderRadius: responsiveHeight(5),
  borderRadiusLarge: responsiveHeight(10),
  borderRadiusHuge: responsiveHeight(20),
  // margin
  marginTop: responsiveHeight(12),
  marginHorizontal: responsiveWidth(24),
  marginVertical: responsiveWidth(16),
  marginVerticalHuge: responsiveHeight(74),
  paddingHorizontal: responsiveWidth(20),

  voucherBorderRadius: responsiveHeight(15),
  logoWidth: responsiveWidth(300),
  logoHeight: responsiveHeight(70),
  inputHeight: responsiveHeight(48),
  sizeCode: responsiveHeight(48),
  sizeQrCode: responsiveHeight(240),
  sizePayment: responsiveHeight(96),
  textWidthToast: responsiveWidth(275),
  buttonHeight: responsiveHeight(48),
  icon: responsiveHeight(30),
  iconTiny: responsiveHeight(10),
  iconSmall: responsiveHeight(16),
  iconMedium: responsiveHeight(20),
  iconLarge: responsiveHeight(24),
  iconItem: responsiveHeight(40),
  iconHuge: responsiveHeight(48),
  iconXHuge: responsiveHeight(56),
  iconMassive: responsiveHeight(64),
  avatar: responsiveHeight(96),
  line: responsiveHeight(1),
  lineLarge: responsiveHeight(2),

  // height Svg
  heightSvgDefault: responsiveHeight(64),
  heightSvgMedium: responsiveHeight(108),
  heightSvgLarge: responsiveHeight(156),

  //default modal
  minWidthModal: responsiveWidth(327),

  default: 0,
  subtract: responsiveHeight(85),
} as const

const FontSizes = {
  tiny: responsiveFont(12),
  small: responsiveFont(14),
  span: responsiveFont(14),
  body: responsiveFont(16),
  regular: responsiveFont(16),
  large: responsiveFont(18),
  title: responsiveFont(20),
  title1: responsiveFont(48),
  title2: responsiveFont(32),
  title3: responsiveFont(24),
} as const

export {
  metrics,
  FontSizes,
  isIOS,
  shadow,
  hitSlop,
  responsiveFont as pf,
  responsiveHeight as ph,
  responsiveWidth as pw,
  deviceWidth,
  deviceHeight,
}
