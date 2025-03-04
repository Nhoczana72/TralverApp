import {StyleSheet} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';

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
  },
  tx_title: {
    color: 'white',
    fontSize: wp(10),
    fontWeight: '700',
    marginTop: hp(1),
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
