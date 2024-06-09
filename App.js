import React, { useCallback } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import BottomTabBarScreen from "./components/bottomTabBarScreen";
import AvailableDeliveriesScreen from "./screens/availableDeliveries/availableDeliveriesScreen";
import DeliveryDetailWithMapScreen from "./screens/deliveryDetailWithMap/deliveryDetailWithMapScreen";
import EditProfileScreen from "./screens/editProfile/editProfileScreen";
import NotificationsScreen from "./screens/notifications/notificationsScreen";
import ShareAndEarnScreen from "./screens/shareAndEarn/shareAndEarnScreen";
import SettingsScreen from "./screens/settings/settingsScreen";
import SplashScreen from "./screens/splashScreen";
import SigninScreen from "./screens/auth/signinScreen";
import SignupScreen from "./screens/auth/signupScreen";
import VerificationScreen from "./screens/auth/verificationScreen";
import * as ExpoSplashScreen from "expo-splash-screen";
import { useFonts } from "expo-font";

ExpoSplashScreen.preventAutoHideAsync();

LogBox.ignoreAllLogs();

const Stack = createStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    Montserrat_Regular: require("./assets/fonts/Montserrat-Regular.ttf"),
    Montserrat_Medium: require("./assets/fonts/Montserrat-Medium.ttf"),
    Montserrat_SemiBold: require("./assets/fonts/Montserrat-SemiBold.ttf"),
    Montserrat_Bold: require("./assets/fonts/Montserrat-Bold.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await ExpoSplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  onLayoutRootView();

  if (!fontsLoaded) {
    return null;
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            ...TransitionPresets.SlideFromRightIOS,
          }}
        >
          <Stack.Screen name="Splash" component={SplashScreen} options={{ ...TransitionPresets.DefaultTransition }} />
          <Stack.Screen name="Signin" component={SigninScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
          <Stack.Screen name="Verification" component={VerificationScreen} />
          <Stack.Screen name="BottomTabBar" component={BottomTabBarScreen} options={{ ...TransitionPresets.DefaultTransition }} />
          <Stack.Screen name="AvailableDeliveries" component={AvailableDeliveriesScreen} />
          <Stack.Screen name="DeliveryDetailWithMap" component={DeliveryDetailWithMapScreen} />
          <Stack.Screen name="EditProfile" component={EditProfileScreen} />
          <Stack.Screen name="Notifications" component={NotificationsScreen} />
          <Stack.Screen name="ShareAndEarn" component={ShareAndEarnScreen} />
          <Stack.Screen name="Settings" component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;