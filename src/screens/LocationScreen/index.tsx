import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native'
import React, {useState} from 'react'
import {useFocusEffect, useNavigation} from '@react-navigation/native'
import database from '@react-native-firebase/database'
import {LatLng} from 'react-native-maps'
import LayOut from '../../components/Layout'
import SearchBar from '../../components/SearchBar'
import {CustomImage} from '../../components/Image'
import {navigate} from '../../navigators/RootNavigation'

export interface PostionType extends LatLng {
  timestame: string
  editable: boolean
}
const LocationScreen = () => {
  const [list, setList] = useState<PostionType[]>([])
  const navigation = useNavigation()
  useFocusEffect(
    React.useCallback(() => {
      database()
        .ref('/tracking')
        .once('value')
        .then(e => {
          console.log(e)

          setList(
            Object.values(e.val()).map((l: any) => ({
              latitude: l?.coords?.latitude ?? 0,
              longitude: l?.coords?.longitude ?? 0,
              timestame: l?.timestamp ?? 0,
              editable: false,
            })),
          )
        })
    }, []),
  )

  const onViewMap = (latitude: number, longitude: number) => {
    navigate('MapScreen', {
      latitude: latitude,
      longitude: longitude,
    })
  }

  // eslint-disable-next-line react/no-unstable-nested-components
  const RenderItem = ({item}: {item: PostionType}) => {
    const date = new Date(item.timestame)
    const editable = item.editable

    return (
      <View style={styles.item}>
        <View style={{flex: 3}}>
          <Text>{date.toDateString()}</Text>
          <SearchBar
            value={item.longitude.toString()}
            editable={!editable}
            style={{width: '60%'}}
            showIcon={false}
          />
          <SearchBar
            value={item.latitude.toString()}
            editable={!editable}
            style={{width: '60%'}}
            showIcon={false}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              onViewMap(item.latitude, item.longitude)
            }}>
            <CustomImage name={'map'} />
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <LayOut titileHeader="LOCATION SCREEN" hasBack={false}>
      <FlatList<PostionType>
        data={list}
        keyExtractor={item => item.timestame}
        renderItem={({item}) => <RenderItem item={item} />}
      />
    </LayOut>
  )
}

export default LocationScreen

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: 1,
  },
})
