import React, {useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import {styles} from './SignUp.styles';
import {SignUpLogic} from './SignUp.logic';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getSource} from '~assets';
import {TextInput} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/AntDesign';
import OTPTextInput from 'react-native-otp-textinput';
import {navigate} from '~core/helper/navigate';
import * as Animatable from 'react-native-animatable';
import {animate} from '~config';
export const SignUp: React.FC<any> = props => {
  const {} = props;
  const {} = SignUpLogic();
  const [staStt, setStaCount] = useState(0);
  return (
    <>
      {staStt === 0 ? (
        <View style={styles.container}>
          {/* <ImageBackground
    source={{
      uri: 'https://static.vecteezy.com/system/resources/previews/010/547/416/large_2x/brown-to-dark-blue-gradient-background-free-photo.jpg',
    }}
    style={styles.image}
    resizeMode="cover"> */}
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: hp(20),
              alignItems: 'center',
            }}>
            <Image
              source={getSource('LOGO1')}
              style={{
                width: wp(10),
                height: wp(10),
                tintColor: 'white',
              }}
            />
            <Text style={styles.tx_title}>Travely</Text>
          </View>
          <View
            style={{
              width: '100%',
              height: '40%',
              paddingHorizontal: wp(5),
              marginTop: hp(20),
            }}>
            <Text style={styles.tx_title1}>Enter your phone number</Text>
            <View
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.4)',
                paddingHorizontal: wp(3),
                paddingVertical: hp(1.5),
                borderRadius: wp(3),
                marginTop: hp(2),
                flexDirection: 'row',
              }}>
              <Text style={styles.tx_number}>+31</Text>
              <TextInput
                placeholder="Phone Number"
                placeholderTextColor={'white'}
                style={styles.tx_input}
                textContentType="telephoneNumber"
              />
            </View>
            <Text style={styles.tx2}>
              We will send an OTP for verification to your number
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              paddingVertical: hp(2),
              paddingHorizontal: wp(6),
              flexDirection: 'row',
              borderRadius: wp(10),
              alignItems: 'center',
              maxWidth: '50%',
              alignSelf: 'center',
            }}
            onPress={() => {
              setStaCount(1);
            }}>
            <Icon name="check" size={wp(5)} color={'white'} />

            <Text
              style={{
                fontSize: wp(5),
                color: 'white',
                fontWeight: '700',
                marginLeft: wp(2),
              }}>
              Confirm
            </Text>
          </TouchableOpacity>

          {/* </ImageBackground> */}
        </View>
      ) : staStt === 1 ? (
        <Animatable.View animation={animate.fadeIn} style={styles.container}>
          {/* <ImageBackground
      source={{
        uri: 'https://static.vecteezy.com/system/resources/previews/010/547/416/large_2x/brown-to-dark-blue-gradient-background-free-photo.jpg',
      }}
      style={styles.image}
      resizeMode="cover"> */}
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              marginTop: hp(20),
              alignItems: 'center',
            }}>
            <Text style={styles.tx_title}>Send Otp</Text>
          </View>
          <View
            style={{
              width: '100%',
              height: '40%',
              paddingHorizontal: wp(5),
              marginTop: hp(20),
            }}>
            <Text style={styles.tx_title1}>Confirm your phone number</Text>
            <OTPTextInput
              ref={(e: any) => console.log('ref', e)}
              inputCount={4}
              textInputStyle={styles.tx_otp_box}
              containerStyle={{borderWidth: 0}}
              // inputCellLength={1}
              // handleTextChange={(tx: string) => setOTP(tx)}
              // offTintColor={'white'}
              tintColor={'white'}
            />

            <Text style={styles.tx2}>
              Enter the verification code sent to +86 334 515 522{' '}
            </Text>
            <Text style={styles.tx2}>
              Resending code in{' '}
              <Text style={{color: '#97D6BD', fontWeight: '700'}}>47</Text>{' '}
              secs.
              <Text style={{fontWeight: '700'}}>Resend Now</Text>
            </Text>
          </View>
          <TouchableOpacity
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.3)',
              paddingVertical: hp(2),
              paddingHorizontal: wp(6),
              flexDirection: 'row',
              borderRadius: wp(10),
              alignItems: 'center',
              maxWidth: '50%',
              alignSelf: 'center',
            }}
            onPress={() => {
              navigate('SelectCountry');
            }}>
            <Icon name="check" size={wp(5)} color={'white'} />

            <Text
              style={{
                fontSize: wp(5),
                color: 'white',
                fontWeight: '700',
                marginLeft: wp(2),
              }}>
              Confirm
            </Text>
          </TouchableOpacity>

          {/* </ImageBackground> */}
        </Animatable.View>
      ) : (
        <></>
      )}
    </>
  );
};
