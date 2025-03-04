import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';
import {CodePushSelector} from '~modules/setting/settingStore';
import {
  Splash,
  Auth,
  IntroScreen,
  SignUp,
  SelectCountry,
  Home,
  PlaceDetail,
} from '~view';
import {navigationRef} from '~core/helper/navigate';
const Stack = createNativeStackNavigator();

const privateScreen: any[] = [IntroScreen, SignUp];

const MainRouter = () => {
  const {splash} = useSelector(CodePushSelector);
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!splash ? (
          <Stack.Screen name="SplashScreen" component={Splash} />
        ) : (
          <>
            <Stack.Screen name="IntroScreen" component={IntroScreen} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SelectCountry" component={SelectCountry} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="PlaceDetail" component={PlaceDetail} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default React.memo(MainRouter);
