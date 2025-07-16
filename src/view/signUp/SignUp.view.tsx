import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ImageBackground,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {styles} from './SignUp.styles';
import {SignUpLogic} from './SignUp.logic';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {getIcons, getSource} from '~assets';
import Icon from 'react-native-vector-icons/AntDesign';
import OTPTextInput from 'react-native-otp-textinput';
import {navigate} from '~core/helper/navigate';
import * as Animatable from 'react-native-animatable';
import {animate, listCountry} from '~config';
import {ModalSelectCountry, RoundedButton} from '~components';
import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import { AccessToken, LoginButton, LoginManager, Profile } from 'react-native-fbsdk-next';
import { useDispatch, useSelector } from 'react-redux';
import store from '~core/store';
import profileStore, { TokenSelector } from '~modules/authentication/profileStore';
export const SignUp: React.FC<any> = props => {
  const {} = props;
  const {fadeIn, fadeOut, fadeIn1} = SignUpLogic();
  const [staStt, setStaCount] = useState(0);
const dispatch=useDispatch();
const [userName, setUserName] = useState(null);

 
  const [staModalContry, setStaModalCountry] = useState({
    isOpen: false,
    item: listCountry[0],
  });
  // 0 : chưa chọn phương thức , 1:Face , 2:Google , 3:SDT
  const [staLogin, setStaLogin] = useState(0);
const  {user}=useSelector(TokenSelector)
  // Hàm kiểm tra token và profile khi app start
  const checkCurrentAccess = async () => {
    const data = await AccessToken.getCurrentAccessToken();
    console.log(  "AccessToken", data);
    
    if (data) {
      // Có token, thử lấy profile
      const profile = await Profile.getCurrentProfile();
      console.log("Profile", profile);
      
      if (profile) {
        setUserName(profile.name);
        setStaLogin(1)
        setStaCount(1)
              dispatch(profileStore.actions.fetchProfile({user: profile}));

                        // navigate('SelectCountry');

      } else {
        // Profile không lấy được => logout để dọn token không hợp lệ
        LoginManager.logOut();
        setUserName(null);
      }
    } else {
      // Không có token => chưa đăng nhập
      setUserName(null);
    }
  };

  useEffect(() => {

    checkCurrentAccess();
  }, [staLogin]);


  return (
    <>
      <View style={styles.container}>
        <ModalSelectCountry
          isOpen={staModalContry.isOpen}
          onSelectItem={item => {
            setStaModalCountry({isOpen: false, item: item});
          }}
        />
        {staStt === 0 ? (
          <>
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
            <Animatable.View
              animation={staLogin === 0 ? fadeIn : fadeOut}
              duration={staLogin === 0 ? 0 : 3000}
              style={{
                width: '100%',
                height: '40%',
                paddingHorizontal: wp(5),
                marginTop: hp(20),
              }}>
              <RoundedButton
                onPress={() => {
                  // setStaLogin(1);
// LoginManager.logOut();

                }}
                leftIcon={
                  <Image
                    source={getIcons('FACEBOOK')}
                    style={{height: 25, width: 25}}
                  />
                }
                title="Tiếp tục với Facebook"
                textStyle={{width: '90%'}}
              />

         <LoginButton
          onLoginFinished={
            (error, result) => {
              if (error) {
                console.log("login has error: " ,result);
                setStaLogin(0)
              } else if (result.isCancelled) {
                                setStaLogin(0)

                console.log("login is cancelled.");
              } else {
                AccessToken.getCurrentAccessToken().then(
                  (data) => {
                                    setStaLogin(1)

                    console.log("Data",data)
                  }
                )
              }
            }
          }
          onLogoutFinished={() => console.log("logout.")}/>
              <RoundedButton
                onPress={() => {
                  setStaLogin(2);
                }}
                containerStyle={{marginTop: heightPercentageToDP(2)}}
                leftIcon={
                  <Image
                    source={getIcons('GOOGLE')}
                    style={{height: 25, width: 25}}
                  />
                }
                title="Tiếp tục với Google"
                textStyle={{width: '90%'}}
              />
              <View
                style={{
                  height: 1,
                  width: '90%',
                  backgroundColor: 'white',
                  alignSelf: 'center',
                  marginVertical: heightPercentageToDP(5),
                }}
              />
              <RoundedButton
                onPress={() => {
                  setStaLogin(3);
                  // setStaCount(1);
                }}
                leftIcon={
                  <IconFontAwesome name="phone" size={wp(5)} color={'black'} />
                }
                title="Tiếp tục với số điện thoại"
                textStyle={{width: '90%'}}
              />
            </Animatable.View>
            {staLogin === 1 && (
              <Animatable.View
                animation={fadeIn1  } duration={3000}>
                 <Text style={styles.tx_title}>Xác nhận đăng nhập</Text>
                    <View style={{width:widthPercentageToDP(25),height:widthPercentageToDP(25),borderWidth:1,borderColor:"yellow",borderRadius:100,alignSelf:"center"}}>
                  <Image source={{uri:user?.imageURL}} style={{width:"100%",height:"100%",borderRadius:100}} />

                    </View>
                    <Text>{user?.name}</Text>
                 <View style={{flexDirection:"row"}}>
<RoundedButton onPress={()=>{LoginManager.logOut(); setStaLogin(0)}}  title='Huỷ bỏ'/>
<RoundedButton onPress={()=>{                navigate('SelectCountry');
}} title='Xác nhận'/>

                 </View>
                </Animatable.View>)}
            {staLogin === 3 && (
              <Animatable.View animation={fadeIn1} duration={3000}>
                <View
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.4)',
                    paddingHorizontal: wp(3),
                    paddingVertical: hp(1.5),
                    borderRadius: wp(3),
                    marginTop: hp(2),
                    flexDirection: 'row',
                    width: '90%',
                    alignSelf: 'center',
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      setStaModalCountry({...staModalContry, isOpen: true});
                    }}
                    style={{flexDirection: 'row'}}>
                    <Image
                      source={{uri: staModalContry?.item.uri}}
                      style={{width: wp(6), height: wp(4), marginLeft: wp(3)}}
                      resizeMode="stretch"
                    />
                    <Text style={styles.tx_number}>
                      {staModalContry?.item.maDienThoai}
                    </Text>
                  </TouchableOpacity>

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
                <Text
                  onPress={() => {
                    setStaCount(0);
                    setStaLogin(0);
                  }}
                  style={{
                    textDecorationLine: 'underline',
                    color: 'white',
                    textAlign: 'center',
                    marginTop: heightPercentageToDP(2),
                  }}>
                  Back to the screen Login
                </Text>
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
                    marginTop: heightPercentageToDP(20),
                  }}
                  onPress={() => {
                    setStaCount(1);
                    // navigate('SelectCountry');
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
              </Animatable.View>
            )}
          </>
        ) : // </View>
        staStt === 1 &&staLogin===3? (
          <Animatable.View
            animation={animate.fadeIn}
            duration={3000}
            style={styles.container}>
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
              <Text
                onPress={() => {
                  setStaCount(0);
                  setStaLogin(0);
                }}
                style={{
                  textDecorationLine: 'underline',
                  color: 'white',
                  textAlign: 'center',
                  marginTop: heightPercentageToDP(2),
                }}>
                Back to the screen Login
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
        ) :   staStt === 1 &&staLogin===1? (
          <Animatable.View
            animation={animate.fadeIn}
            duration={3000}
            style={styles.container}>
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
              <Text style={styles.tx_title}>Xác Minh Đăng Nhập</Text>
            </View>
            <View
              style={{
                width: '100%',
                height: '40%',
                paddingHorizontal: wp(5),
                marginTop: hp(5),
              }}>
                  <View style={{width:widthPercentageToDP(25),height:widthPercentageToDP(25),borderWidth:1,borderColor:"yellow",borderRadius:100,alignSelf:"center"}}>
                  <Image source={{uri:user?.imageURL}} style={{width:"100%",height:"100%",borderRadius:100}} />

                    </View>
                    <Text style={[styles.tx_title1,{alignSelf:"center",marginVertical:heightPercentageToDP(2)}]}>{user?.name}</Text>
                 
            </View>
                                 <View style={{flexDirection:"row",justifyContent:"space-around"}}>

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

                  setStaCount(0);
                  setStaLogin(0);              }}>
              <Icon name="check" size={wp(5)} color={'white'} />

              <Text
                style={{
                  fontSize: wp(5),
                  color: 'white',
                  fontWeight: '700',
                  marginLeft: wp(2),
                }}>
                Cancel
              </Text>
            </TouchableOpacity>
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
</View>

            {/* </ImageBackground> */}
          </Animatable.View>
        ) :(
          <></>
        )}
      </View>
    </>
  );
};
