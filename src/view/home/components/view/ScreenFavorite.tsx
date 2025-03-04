import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {useDispatch, useSelector} from 'react-redux';
import {Colors} from '~assets/color';
import {useAltaIntl} from '~core';
import {TokenSelector} from '~modules/authentication';
import {listAddress} from '~view/home/datajson';
import {IPlace} from '~view/placeDetail/PlaceDetail.logic';
import IconHeart from 'react-native-vector-icons/FontAwesome';
import {StarRatingDisplay} from 'react-native-star-rating-widget';
import {navigate} from '~core/helper/navigate';

export interface IScreenFavor {}

export const ScreenFavor: React.FC<IScreenFavor> = props => {
  const {} = props;
  const {listFavor} = useSelector(TokenSelector);
  const dispatch = useDispatch();
  const [staListFavorite, setStaListFavorite] = useState<IPlace[]>();

  useEffect(() => {
    const _listFavor = [...listFavor];

    const _listFavorite = listAddress.filter(item =>
      _listFavor.includes(item.id),
    );
    setStaListFavorite(_listFavorite);
  }, []);
  const {translate} = useAltaIntl();
  return (
    <View style={styles.container}>
      <Text style={styles.tx_title}>Danh sách yêu thích</Text>
      <FlatList
        data={staListFavorite}
        keyExtractor={item => item?.id?.toString()}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigate('PlaceDetail', {data: item});
              }}
              style={{
                // backgroundColor: Colors.BGR_BTN,
                width: wp(90),
                borderRadius: wp(2),
                padding: hp(2),
                marginVertical: hp(1),
                borderColor: 'white',
                borderWidth: 0.5,
                flexDirection: 'row',
              }}>
              <Image
                source={{uri: item.hinh_anh}}
                style={{
                  width: wp(25),
                  height: wp(30),
                  borderRadius: wp(2),
                }}
              />
              <View
                style={{
                  width: wp(59),
                  paddingHorizontal: hp(2),
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.tx_title}>{item.ten}</Text>
                  <IconHeart
                    name={listFavor.includes(item.id) ? 'heart' : 'heart-o'}
                    color={listFavor.includes(item.id) ? '#F65B1F' : 'gray'}
                    size={wp(4)}
                  />
                </View>
                <Text style={styles.tx_title1}>
                  Loại địa điểm:{' '}
                  {item?.loai_dia_diem ? translate(item?.loai_dia_diem) : ''}{' '}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginVertical: hp(1),
                  }}>
                  <StarRatingDisplay
                    rating={item?.rating}
                    //   starStyle={{width: widthPercentageToDP(50)}}
                    starSize={15}
                  />
                  <Text style={{color: 'white'}}>{item?.rating}</Text>
                </View>

                <Text numberOfLines={2} style={styles.tx_title1}>
                  {item?.mo_ta}
                </Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: hp(5),
    paddingLeft: wp(5),
  },
  tx_title: {
    color: 'white',
    fontSize: wp(5),
    fontWeight: '700',
  },
  tx_title1: {
    color: 'white',
    fontSize: wp(3.3),
  },
  tx_title2: {
    color: 'white',
    fontSize: wp(4),
    fontWeight: '700',
  },
});
