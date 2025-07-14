import {heightPercentageToDP} from 'react-native-responsive-screen';
import {useDispatch} from 'react-redux';
export const SignUpLogic = () => {
  const dispatch = useDispatch();
  const fadeIn = {
    from: {
      opacity: 0,
      // marginLeft: wp(100),
    },
    to: {
      opacity: 1,
      // marginLeft: wp(0),
    },
  };
  const fadeOut = {
    from: {
      opacity: 1,
    },
    to: {
      opacity: 0,
    },
  };
  const fadeIn1 = {
    from: {
      opacity: 0,
      // position: 'absolute',
      bottom: 0,
    },
    to: {
      opacity: 1,
      // position: 'absolute',
      bottom: heightPercentageToDP(40),
    },
  };
  return {dispatch, fadeIn, fadeOut, fadeIn1};
};
