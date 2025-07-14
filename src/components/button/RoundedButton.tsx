import React from 'react';
import {
  StyleSheet,
  Text,
  TextProps,
  StyleProp,
  ViewStyle,
  TextStyle,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import Ripple from 'react-native-material-ripple';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {Colors} from '~assets/color';

export interface RoundedButtonProps extends TextProps {
  containerStyle?: StyleProp<ViewStyle>;
  title?: string;
  onPress?: () => void;
  leftIcon?: any;
  rightIcon?: any;
  textStyle?: StyleProp<TextStyle>;
}

const _RoundedButton: React.FC<RoundedButtonProps> = props => {
  const {title, onPress, leftIcon, rightIcon, textStyle} = props;
  return (
    <Ripple
      onPress={onPress}
      style={StyleSheet.flatten([_styles.container, props.containerStyle])}>
      {/* <LinearGradient colors={['#EE4E9B', '#D06767']} style={_styles.linear}> */}
      {leftIcon && leftIcon}
      <Text style={[_styles.title, textStyle]}>{title}</Text>
      {rightIcon && rightIcon}
      {/* </LinearGradient> */}
    </Ripple>
  );
};

const _styles = StyleSheet.create({
  container: {
    // height: 44,
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    borderRadius: widthPercentageToDP(100),
    backgroundColor: Colors.WHITE,
    paddingVertical: heightPercentageToDP(1.5),
    paddingHorizontal: widthPercentageToDP(5),
  },
  linear: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  title: {
    color: 'black',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 14,
  },
});

export const RoundedButton = React.memo(_RoundedButton);
