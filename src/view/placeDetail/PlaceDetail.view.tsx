import React, {useRef, useState} from 'react';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';
import {styles} from './PlaceDetail.styles';
import {PlaceDetailLogic} from './PlaceDetail.logic';
import {
  heightPercentageToDP,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import MapView, {Marker} from 'react-native-maps';
import IconHeart from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';
import {useNavigation} from '@react-navigation/native';
import {Modal} from '~components';
import profileStore from '~modules/authentication/profileStore';
export const PlaceDetail: React.FC<any> = props => {
  const {} = props;
  const {staDataPlace, listFavor, dispatch} = PlaceDetailLogic();
  const {goBack} = useNavigation();
  const [staModalImg, setStaModalImg] = useState({
    open: false,
    index: 0,
  });
  const refScroll = useRef();
  const [staLayoutArr, setStaLayoutArr] = useState<any>([]);
  console.log('staLayoutArr', staLayoutArr);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          if (refScroll?.current) {
            refScroll?.current?.scrollTo({x: 0, y: 0, animated: true});
          }
        }}
        style={{
          position: 'absolute',
          zIndex: 1,
          bottom: heightPercentageToDP(5),
          right: wp(5),
        }}>
        <Animatable.View
          iterationCount={'infinite'}
          duration={2000}
          style={{
            width: wp(10),
            height: wp(10),

            backgroundColor: 'rgba(255,255,255,0.4)',

            justifyContent: 'center',
            alignItems: 'center',
          }}
          animation={'tada'}>
          <IconHeart name="arrow-up" size={wp(4)} />
        </Animatable.View>
      </TouchableOpacity>
      {staModalImg.open && (
        <Modal isOpen={staModalImg.open} position="center">
          <>
            <TouchableOpacity
              onPress={() => {
                setStaModalImg({open: false, index: -1});
              }}
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
              }}
            />
            <View>
              <Image
                source={{uri: staDataPlace?.trip_photos[staModalImg.index]}}
                style={{width: wp(90), height: heightPercentageToDP(50)}}
                resizeMode="contain"
              />
            </View>
          </>
        </Modal>
      )}

      <View
        style={{
          flexDirection: 'row',
          width: wp(90),
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            goBack();
          }}>
          <Icon name="arrowleft" color={'white'} size={wp(6)} />
        </TouchableOpacity>
        <Text style={styles.tx_title}>{staDataPlace?.ten}</Text>
        <TouchableOpacity
          onPress={() => {
            const _listFavorite = [...listFavor];
            if (_listFavorite.includes(staDataPlace.id)) {
              const _index = _listFavorite.findIndex(
                itemm => itemm === staDataPlace?.id,
              );
              _listFavorite.splice(_index, 1);
            } else {
              _listFavorite.push(staDataPlace?.id);
            }
            dispatch(
              profileStore.actions.setListFavorite({
                listFavor: _listFavorite,
              }),
            );

            // setStaListFavorite(_listFavorite);
          }}>
          <IconHeart
            name={listFavor.includes(staDataPlace?.id) ? 'heart' : 'heart-o'}
            color={listFavor.includes(staDataPlace?.id) ? '#F65B1F' : 'white'}
            size={wp(6)}
          />
        </TouchableOpacity>
      </View>
      <ScrollView ref={refScroll}>
        <Image source={{uri: staDataPlace?.hinh_anh}} style={styles.img} />
        <Text style={styles.tx_title}>Thông tin chi tiết</Text>
        <Text style={[styles.tx_title1]}>
          {staDataPlace?.thong_tin_chi_tiet}
        </Text>
        <Text style={styles.tx_title}>Ảnh</Text>
        <View
          style={{
            flexDirection: 'row',
          }}>
          <TouchableOpacity
            onPress={() => {
              setStaModalImg({open: true, index: 0});
            }}>
            <Image
              style={{
                width: wp(28),
                height: wp(30),
                borderRadius: wp(2),
                marginRight: wp(2),
              }}
              source={{uri: staDataPlace?.trip_photos[0]}}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setStaModalImg({open: true, index: 1});
            }}>
            <Image
              style={{
                width: wp(28),
                height: wp(30),
                borderRadius: wp(2),
                marginRight: wp(2),
              }}
              source={{uri: staDataPlace?.trip_photos[1]}}
            />
          </TouchableOpacity>

          {staDataPlace?.trip_photos.length >= 3 && (
            <TouchableOpacity
              style={{width: wp(28), height: wp(30)}}
              onPress={() => {
                setStaModalImg({open: true, index: 2});
              }}>
              <Image
                style={{
                  width: wp(28),
                  height: wp(30),
                  borderRadius: wp(2),
                  marginRight: wp(2),
                }}
                source={{uri: staDataPlace?.trip_photos[2]}}></Image>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  backgroundColor: 'rgba(0,0,0,0.65)',
                  position: 'absolute',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={styles.tx_title2}>
                  +{staDataPlace?.trip_photos?.length - 2}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.tx_title}>Mục lục</Text>

        <Text style={styles.tx_title2}>Ẩm thực địa phương</Text>
        {staDataPlace?.mon_an_dac_san?.map((item: any, index: number) => {
          return (
            <TouchableOpacity
              style={{marginLeft: wp(2)}}
              onPress={() => {
                const findItem = staLayoutArr.find(i => i?.id === item?.id);
                console.log('fondItemmm', findItem);

                if (refScroll.current !== undefined) {
                  refScroll.current?.scrollTo({
                    x: 0,
                    y: findItem?.layout?.y,
                    animated: true,
                  });
                }
              }}>
              <Text
                style={[styles.tx_title1, {textDecorationLine: 'underline'}]}>
                {index + 1}.{item?.ten}
              </Text>
            </TouchableOpacity>
          );
        })}
        <Text style={styles.tx_title2}>Danh lam thắng cảnh</Text>
        {staDataPlace?.dia_diem_noi_tieng?.map((item: any, index: number) => {
          return (
            <TouchableOpacity
              style={{marginLeft: wp(2)}}
              onPress={() => {
                const findItem = staLayoutArr.find(i => i?.id === item?.id);
                console.log('fondItemmm', findItem);

                if (refScroll.current !== undefined) {
                  refScroll.current?.scrollTo({
                    x: 0,
                    y: findItem?.layout?.y,
                    animated: true,
                  });
                }
              }}>
              <Text
                style={[styles.tx_title1, {textDecorationLine: 'underline'}]}>
                {index + 1}.{item?.ten}
              </Text>
            </TouchableOpacity>
          );
        })}
        <Text style={styles.tx_title2}>Lễ hội</Text>
        {staDataPlace?.leHoi?.map((item: any, index: number) => {
          return (
            <TouchableOpacity
              style={{marginLeft: wp(2)}}
              onPress={() => {
                const findItem = staLayoutArr.find(i => i?.id === item?.id);
                console.log('fondItemmm', findItem);

                if (refScroll.current !== undefined) {
                  refScroll.current?.scrollTo({
                    x: 0,
                    y: findItem?.layout?.y,
                    animated: true,
                  });
                }
              }}>
              <Text
                style={[styles.tx_title1, {textDecorationLine: 'underline'}]}>
                {index + 1}.{item?.ten}
              </Text>
            </TouchableOpacity>
          );
        })}
        <Text style={styles.tx_title}>Ẩm thực địa phương</Text>

        {staDataPlace?.mon_an_dac_san?.map((item: any, index: number) => {
          return (
            <View
              onLayout={e => {
                // setStaLayoutArr((pre)=>{})
                setStaLayoutArr([
                  ...staLayoutArr,
                  {...e.nativeEvent, id: item?.id},
                ]);
                // console.log(item.ten, '  ', e.nativeEvent);
              }}>
              <Text
                style={{
                  color: 'white',
                  // fontFamily: Font.North_Land,
                  fontSize: wp(5),
                  fontWeight: '600',
                  paddingVertical: heightPercentageToDP(2),
                }}>
                {index + 1}.{item?.ten}
              </Text>
              <Image
                source={{uri: item?.anh}}
                style={{width: '100%', height: heightPercentageToDP(40)}}
              />
              <Text
                style={{color: 'white', marginTop: heightPercentageToDP(2)}}>
                {item?.mota}
              </Text>
              <Text
                style={{
                  color: 'white',
                  marginTop: heightPercentageToDP(2),
                  fontWeight: '600',
                }}>
                Địa chỉ gợi ý:{' '}
                <Text style={{fontWeight: '400'}}>{item?.goiyDiaDiem}</Text>
              </Text>
            </View>
          );
        })}
        <Text style={styles.tx_title}>Danh lam thắng cảnh</Text>

        {staDataPlace?.dia_diem_noi_tieng?.map((item: any, index: number) => {
          return (
            <View
              onLayout={e => {
                // setStaLayoutArr((pre)=>{})
                setStaLayoutArr([
                  ...staLayoutArr,
                  {...e.nativeEvent, id: item?.id},
                ]);
                // console.log(item.ten, '  ', e.nativeEvent);
              }}>
              <Text
                style={{
                  color: 'white',
                  // fontFamily: Font.North_Land,
                  fontSize: wp(5),
                  fontWeight: '600',
                  paddingVertical: heightPercentageToDP(2),
                }}>
                {index + 1}.{item?.ten}
              </Text>
              <Image
                source={{uri: item?.anh}}
                style={{width: '100%', height: heightPercentageToDP(40)}}
              />
              <Text
                style={{color: 'white', marginTop: heightPercentageToDP(2)}}>
                {item?.mota}
              </Text>
            </View>
          );
        })}
        <Text style={styles.tx_title}>Lễ hội</Text>

        {staDataPlace?.leHoi?.map((item: any, index: number) => {
          return (
            <View
              onLayout={e => {
                // setStaLayoutArr((pre)=>{})
                setStaLayoutArr([
                  ...staLayoutArr,
                  {...e.nativeEvent, id: item?.id},
                ]);
                // console.log(item.ten, '  ', e.nativeEvent);
              }}>
              <Text
                style={{
                  color: 'white',
                  // fontFamily: Font.North_Land,
                  fontSize: wp(5),
                  fontWeight: '600',
                  paddingVertical: heightPercentageToDP(2),
                }}>
                {index + 1}.{item?.ten}
              </Text>
              <Image
                source={{uri: item?.anh}}
                style={{width: '100%', height: heightPercentageToDP(40)}}
              />
              <Text
                style={{
                  color: 'white',
                  marginTop: heightPercentageToDP(2),
                  fontWeight: '600',
                }}>
                Địa điểm tổ chức:{' '}
                <Text style={{fontWeight: '400'}}>{item?.diaDiem}</Text>
              </Text>
              <Text
                style={{
                  color: 'white',
                  marginTop: heightPercentageToDP(2),
                  fontWeight: '600',
                }}>
                Thời gian diễn ra:{' '}
                <Text style={{fontWeight: '400'}}>{item?.thoigian}</Text>
              </Text>
              <Text
                style={{color: 'white', marginTop: heightPercentageToDP(2)}}>
                {item?.mota}
              </Text>
            </View>
          );
        })}

        <Text style={styles.tx_title}>Bản đồ</Text>
        {staDataPlace?.latitude && (
          <MapView
            style={styles.view_map}
            initialRegion={{
              latitude: staDataPlace?.latitude,
              longitude: staDataPlace?.longitude,
              latitudeDelta: 0.5,
              longitudeDelta: 0.5,
            }}
            onRegionChange={(region, detail) => {
              console.log(region);
            }}>
            <Marker
              coordinate={{
                latitude: staDataPlace?.latitude,
                longitude: staDataPlace?.longitude,
              }}></Marker>
          </MapView>
        )}
      </ScrollView>
    </View>
  );
};
