import {AppState, StyleSheet, Switch, Text, View} from 'react-native'
import React, {useCallback, useEffect, useRef, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {getStatusSendNotification, getTimeRecord} from '../../store/selectors/app'
import LayOut from '../../components/Layout'
import SearchBar from '../../components/SearchBar'
import {CustomButton} from '../../components/Button'
import {startLocationUpdate, stopLocationUpdate} from '../../services'
import {useLocation} from '../../hook'
import {colors} from '../../themes'
import {Space} from '../../components/Space'
import {appActions} from '../../store/reducers'

const SettingScreen = () => {
  const timeRecord = useSelector(getTimeRecord)
  const notificationStatus = useSelector(getStatusSendNotification)
  const [isHasTaskBackground, setIsHasTaskBackground] = useState<boolean>(false)
  const [editable, setEditable] = useState<boolean>(false)
  const [text, setText] = useState<string>(timeRecord.toString())
  const dispatch = useDispatch()
  const {
    hasLocationPermission,
    hasBackgroundLocationPermission,
    requestLocationBackground,
    hasTaskBackground,
  } = useLocation()

  const handleRequestLocationBackground = useCallback(async () => {
    if (hasLocationPermission) {
      await requestLocationBackground()
    }
  }, [hasLocationPermission, requestLocationBackground])

  const handleHasTaskBackground = useCallback(async () => {
    const isHas = await hasTaskBackground()
    setIsHasTaskBackground(isHas)
  }, [hasTaskBackground])

  const appStateRef = useRef(AppState.currentState)

  const handleAppState = useCallback(() => {
    AppState.addEventListener('change', nextAppState => {
      if (appStateRef.current.match(/inactive|background/) && nextAppState === 'active') {
        handleHasTaskBackground().then()
      }
      appStateRef.current = nextAppState
    })
  }, [])

  useEffect(() => {
    handleAppState()
  }, [handleAppState])

  const onIconRightPress = () => {
    if (editable) {
      dispatch(appActions.changeTimeRecord(parseFloat(text)))
    }
    setEditable(pre => !pre)
  }
  return (
    <LayOut titileHeader="SETTING SCREEN" hasBack={false} isRequireDismisKeybarod>
      <View style={styles.row}>
        <View style={styles.left}>
          <Text>Time Record(ms):</Text>
        </View>
        <View style={[styles.right]}>
          <SearchBar
            value={text}
            icon={editable ? 'edit' : 'edit_off'}
            style={{maxWidth: '80%'}}
            onIconRightPress={onIconRightPress}
            editable={editable}
            onChangeText={setText}
            keyboardType="number-pad"
          />
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.left}>
          <Text>Allow Sendnotification:</Text>
        </View>
        <View style={styles.right}>
          <Switch value={notificationStatus} />
        </View>
      </View>
      <View style={styles.buttonView}>
        <CustomButton
          label={[{text: isHasTaskBackground ? 'STOP RECORD' : 'START RECORD'}]}
          style={{paddingHorizontal: 20}}
          color={isHasTaskBackground ? colors.red : colors.green}
          onPress={() => {
            if (isHasTaskBackground) {
              stopLocationUpdate().then(() => setIsHasTaskBackground(false))
            } else {
              startLocationUpdate().then(() => setIsHasTaskBackground(true))
            }
          }}
        />
        <Space height={50} />
        <CustomButton
          label={[{text: 'REQUEST BACKGROUND RECORD'}]}
          style={{paddingHorizontal: 20}}
          disabled={hasBackgroundLocationPermission}
          onPress={handleRequestLocationBackground}
        />
      </View>
    </LayOut>
  )
}

export default SettingScreen

const styles = StyleSheet.create({
  container: {flex: 1},
  row: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
  },
  left: {
    flex: 1,
  },
  right: {
    flex: 1,
    alignItems: 'center',
  },
  buttonView: {
    flex: 1,
    alignItems: 'center',
  },
})
