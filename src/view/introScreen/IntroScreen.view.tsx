import React, {useState} from 'react';
import {View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import {styles} from './IntroScreen.styles';
import {IntroScreenLogic} from './IntroScreen.logic';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/AntDesign';
import * as Animatable from 'react-native-animatable';
import {navigate} from '~core/helper/navigate';
export const IntroScreen: React.FC<any> = props => {
  const {} = props;
  const {} = IntroScreenLogic();

  const [staSttImg, setStaSttImg] = useState(0);
  const listImg = [
    {
      id: '1',
      uri: 'https://inkythuatso.com/uploads/thumbnails/800/2022/06/hinh-nen-viet-nam-4k-cho-dien-thoai-3-inkythuatso-08-14-12-06.jpg',
      tx1: 'See a details plan of your journey',
      tx2: 'Modify your plan according to your needs',
    },
    {
      id: '2',
      uri: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2020/03/thac-nuoc-cao-bang.jpg',
      tx1: 'Share Photos, get feedback & be inspired by others',
      tx2: 'Get suggestions by geolocation & community recommendations',
    },
    {
      id: '3',
      uri: 'https://vnn-imgs-f.vgcloud.vn/2018/11/02/23/50-va-n-ho-a-va-t-the-in-bo-ng-gia-o-du-o-ng-nguye-n-va-n-phu-ng.jpg',
      tx1: 'Connect with travelers having similar interest as yours',
      tx2: 'Help others and be helped by travelers all around you',
    },
  ];
  const fadeIn = {
    from: {
      opacity: 0,
      marginLeft: wp(100),
    },
    to: {
      opacity: 1,
      marginLeft: wp(0),
    },
  };
  const fadeIn1 = {
    from: {
      opacity: 0.1,
    },
    to: {
      opacity: 1,
    },
  };

  const [staListImg, setStaListImg] = useState([]);
  const CircleDot = (visible: boolean) => {
    return (
      <View
        style={{
          width: wp(2),
          height: wp(2),
          backgroundColor: visible ? '#A3E1CC' : 'white',
          marginHorizontal: wp(0.7),
          borderRadius: wp(2),
        }}></View>
    );
  };
  return (
    <View style={styles.container}>
      <Animatable.View animation={fadeIn} duration={500} key={staSttImg}>
        <ImageBackground
          source={{
            uri: listImg[staSttImg].uri,
          }}
          style={styles.image}
          resizeMode="cover">
          <Animatable.View
            delay={500}
            animation={fadeIn1}
            style={{width: '100%', height: '35%'}}>
            <Text style={styles.tx1}> {listImg[staSttImg].tx1}</Text>
            <Text
              style={[
                styles.tx1,
                {
                  color: 'yellow',
                },
              ]}>
              {listImg[staSttImg].tx2}
            </Text>
            <View
              style={{
                flexDirection: 'row',
                width: '80%',
                justifyContent: 'space-between',
                alignSelf: 'center',
                marginTop: hp(10),
                alignItems: 'center',
              }}>
              <View
                style={{
                  backgroundColor: 'rgba(96, 95, 92, 0.4)',
                  height: hp(4),
                  alignItems: 'center',
                  paddingHorizontal: wp(2.5),
                  flexDirection: 'row',
                  borderRadius: wp(3),
                }}>
                {CircleDot(staSttImg === 0)}
                {CircleDot(staSttImg === 1)}
                {CircleDot(staSttImg === 2)}
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: 'rgba(96, 95, 92, 0.4)',
                  paddingVertical: hp(2),
                  paddingHorizontal: wp(6),
                  flexDirection: 'row',
                  borderRadius: wp(10),
                  alignItems: 'center',
                }}
                onPress={() => {
                  if (staSttImg < 2) {
                    setStaSttImg(staSttImg + 1);
                  } else {
                    navigate('SignUp');
                  }
                }}>
                <Text
                  style={{
                    fontSize: wp(5),
                    color: 'white',
                    fontWeight: '700',
                    marginRight: wp(2),
                  }}>
                  Next
                </Text>
                <Icon name="arrowright" size={wp(5)} color={'white'} />
              </TouchableOpacity>
            </View>
          </Animatable.View>
        </ImageBackground>
      </Animatable.View>
    </View>
  );
};
