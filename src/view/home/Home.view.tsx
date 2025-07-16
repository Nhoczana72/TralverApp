import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ImageBackground,
  Image,
  ScrollView,
} from 'react-native';
import {styles} from './Home.styles';
import {HomeLogic} from './Home.logic';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

import Icon from 'react-native-vector-icons/Feather';
import IconHeart from 'react-native-vector-icons/FontAwesome';

import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Colors} from '~assets/color';
import {navigate} from '~core/helper/navigate';
import {listAddress, listCategory} from './datajson';
import store from '~core/store';
import profileStore, { TokenSelector } from '~modules/authentication/profileStore';
import {ScreenFavor, ScreenReels} from './components';
import {useAltaIntl} from '~core';
import { getSource } from '~assets';
import { useSelector } from 'react-redux';

export const Home: React.FC<any> = props => {
  const {} = props;
  const {
    dispatch,
    listFavor,
    onChangeSearch,
    staListPlace,
    setStaListPlace,
    staScreen,
    FlatListRef,
    setStaCategory,
    staCategory,
    translate,
    setStaScreen,
  } = HomeLogic();
const  {user}=useSelector(TokenSelector)

  return (
    <View style={styles.container}>
      <ScrollView>
        {staScreen === 0 ? (
          <View style={{paddingVertical: hp(5), paddingLeft: wp(5)}}>
            <View style={{flexDirection:"row",width:wp(90),alignItems:"center",justifyContent:"space-between"}}>
              <View style={{flexDirection: 'row',alignItems: 'center'}}>
                <Image
                  source={user?.imageURL? {uri: user?.imageURL} : getSource("LOGO")}
                  style={{width: wp(7), height: wp(7),marginRight:wp(3),borderWidth:1,borderColor:"white",borderRadius:wp(10)}}
                />
                <Text style={styles.tx_title}>{user?.name||"Thiên"}</Text>
              </View>
              <View style={{flexDirection: 'row', marginTop: hp(1)}}>
              <SimpleLineIcons
                name={'location-pin'}
                color={'white'}
                size={wp(6)}
              />
              <Text style={styles.tx_title}> Việt Nam</Text>
            </View>
            </View>
            
            <View style={styles.view_search}>
              <Icon name="search" size={wp(6)} color={'white'} />
              <TextInput
                placeholder="Tìm kiếm địa danh"
                placeholderTextColor={'white'}
                onChangeText={(tx: string) => onChangeSearch(tx)}
                style={{
                  width: '80%',
                  paddingHorizontal: wp(3),
                  color: 'white',
                  fontSize: wp(4),
                }}
              />
            </View>
            <Text style={styles.tx_title}>Địa điểm phổ biến</Text>
            <View>
              <FlatList
                data={listAddress}
                horizontal
                ref={ref => (FlatListRef.current = ref)}
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        navigate('PlaceDetail', {data: item});
                      }}>
                      <ImageBackground
                        source={{uri: item.hinh_anh}}
                        imageStyle={{borderRadius: wp(2)}}
                        style={{
                          width: wp(90),
                          height: wp(40),
                          marginRight: wp(5),
                          marginVertical: hp(1),
                        }}>
                        <View style={{marginTop: '30%', marginLeft: wp(3)}}>
                          <Text style={[styles.tx_title2]}>{item?.ten}</Text>
                          <Text style={styles.tx_title1}>
                            <SimpleLineIcons
                              name={'location-pin'}
                              color={'white'}
                              size={wp(3)}
                            />
                            {' ' + item?.vi_tri}
                          </Text>
                        </View>
                      </ImageBackground>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>

            <Text style={styles.tx_title}>Danh mục</Text>
            <View>
              <FlatList
                data={listCategory}
                keyExtractor={(item, index: number) => index.toString()}
                horizontal
                renderItem={({item}) => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setStaCategory(item.id);
                      }}
                      style={{
                        backgroundColor:
                          staCategory === item.id ? '#5EDFFF' : Colors.BGR_BTN,
                        paddingHorizontal: wp(2),
                        paddingVertical: hp(1),
                        borderRadius: wp(2),
                        marginHorizontal: wp(0.5),
                        marginVertical: hp(2),
                      }}>
                      <Text
                        style={[
                          styles.tx_title1,
                          {color: staCategory === item.id ? 'black' : 'white'},
                        ]}>
                        {translate(item?.ten)}
                      </Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingRight: wp(5),
              }}>
              <Text style={styles.tx_title}>Tất cả địa điểm</Text>
            </View>
            <View>
              <FlatList
                data={staListPlace}
                keyExtractor={(item, index: number) => index.toString()}
                // horizontal
                numColumns={2}
                renderItem={({item}) => {
                  return (
                    <View>
                      <TouchableOpacity
                        style={{
                          marginRight: wp(4),
                          marginTop: hp(1),
                          borderRadius: wp(2),
                        }}
                        onPress={() => {
                          navigate('PlaceDetail', {data: item});
                        }}>
                        <ImageBackground
                          source={{uri: item.hinh_anh}}
                          resizeMode="cover"
                          imageStyle={{borderRadius: wp(3)}}
                          style={{
                            width: wp(45),
                            height: wp(45),
                          }}>
                          <View style={{marginTop: '70%', marginLeft: wp(3)}}>
                            <Text style={[styles.tx_title2]}>{item?.ten}</Text>
                            <Text style={styles.tx_title1}>
                              <SimpleLineIcons
                                name={'location-pin'}
                                color={'white'}
                                size={wp(3)}
                              />
                              {' ' + item?.vi_tri}
                            </Text>
                          </View>
                        </ImageBackground>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          const _listFavorite = [...listFavor];
                          if (_listFavorite.includes(item.id)) {
                            const _index = _listFavorite.findIndex(
                              itemm => itemm === item?.id,
                            );
                            _listFavorite.splice(_index, 1);
                          } else {
                            _listFavorite.push(item?.id);
                          }
                          dispatch(
                            profileStore.actions.setListFavorite({
                              listFavor: _listFavorite,
                            }),
                          );

                          // setStaListFavorite(_listFavorite);
                        }}
                        style={{
                          position: 'absolute',
                          top: 14,
                          right: 20,
                          width: wp(8),
                          height: wp(8),
                          backgroundColor: 'white',
                          borderRadius: wp(10),
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}>
                        <IconHeart
                          name={
                            listFavor?.includes(item.id) ? 'heart' : 'heart-o'
                          }
                          color={
                            listFavor?.includes(item.id) ? '#F65B1F' : 'gray'
                          }
                          size={wp(4)}
                        />
                      </TouchableOpacity>
                    </View>
                  );
                }}
              />
            </View>
          </View>
        ) : staScreen === 2 ? (
          <ScreenFavor />
        ) : (
          <ScreenReels />
        )}
      </ScrollView>
      <View
        style={{
          backgroundColor: 'rgba(19,38,52,0.8)',
          position: 'absolute',
          width: '70%',
          height: '10%',
          bottom: hp(1),
          alignSelf: 'center',
          borderRadius: wp(50),
          justifyContent: 'space-around',
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          onPress={() => {
            setStaScreen(0);
          }}
          style={{
            backgroundColor: staScreen === 0 ? '#72AD9D' : '#00000000',
            width: wp(14),
            height: wp(14),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: wp(12),
          }}>
          <Icon
            name="home"
            color={staScreen === 0 ? 'black' : 'white'}
            size={wp(6)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setStaScreen(1);
          }}
          style={{
            backgroundColor: staScreen === 1 ? '#72AD9D' : '#00000000',
            width: wp(14),
            height: wp(14),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: wp(12),
          }}>
          <Icon
            name="play-circle"
            color={staScreen === 1 ? 'black' : 'white'}
            size={wp(6)}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setStaScreen(2);
          }}
          style={{
            backgroundColor: staScreen === 2 ? '#72AD9D' : '#00000000',
            width: wp(14),
            height: wp(14),
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: wp(12),
          }}>
          <Icon
            name="heart"
            color={staScreen === 2 ? 'black' : 'white'}
            size={wp(6)}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
