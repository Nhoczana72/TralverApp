import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import {Font} from '~assets/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: '#031F2B',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'space-between',
  },
  tx_title: {
    color: 'white',
    fontSize: wp(17),
    fontWeight: '700',
    marginTop: hp(1),
    fontFamily: Font.North_Land,
  },
  tx_title1: {
    color: 'white',
    fontSize: wp(5),
    fontWeight: '700',
  },
  tx_number: {
    color: 'white',
    fontSize: wp(3.5),
    fontWeight: '500',
    marginLeft: wp(1),
    borderRightWidth: 1,
    borderRightColor: 'white',
  },
  tx_input: {
    color: 'white',
    fontSize: wp(4),
    // fontWeight: '500',
    marginLeft: wp(3),
    textAlign: 'center',
  },
  tx2: {
    color: 'white',
    fontSize: wp(3),
    fontWeight: '300',
    marginTop: hp(1),
    marginLeft: wp(5),
  },
  tx_otp_box: {
    borderWidth: 0,
    borderRadius: wp(2),
    color: 'white',
    borderBottomWidth: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    marginTop: hp(2),
  },
});
