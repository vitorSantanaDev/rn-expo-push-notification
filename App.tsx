import { StatusBar } from "react-native";
import { NativeBaseProvider } from "native-base";
import {
  useFonts,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { Routes } from "./src/routes";

import { THEME } from "./src/theme";
import { Loading } from "./src/components/Loading";
import { NotificationClickEvent, OneSignal } from "react-native-onesignal";

import { CartContextProvider } from "./src/contexts/CartContext";
import { tagUserInfoCreate } from "./src/notifications/notifications";
import { useEffect } from "react";

OneSignal.initialize("83d44ab2-29f5-4dd4-a0ed-291653b2c1b9");
OneSignal.Notifications.requestPermission(true);

export default function App() {
  const [fontsLoaded] = useFonts({ Roboto_400Regular, Roboto_700Bold });

  tagUserInfoCreate();

  useEffect(() => {
    const handleNotificationClick = (event: NotificationClickEvent) => {
      const { actionId } = event.result;

      switch (actionId) {
        case "1": {
          console.log("Executar ação 1");
          return;
        }
        case "2": {
          console.log("Executar ação 2");
          return;
        }
      }
    };

    OneSignal.Notifications.addEventListener("click", handleNotificationClick);

    return () =>
      OneSignal.Notifications.removeEventListener(
        "click",
        handleNotificationClick
      );
  }, []);

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <CartContextProvider>
        {fontsLoaded ? <Routes /> : <Loading />}
      </CartContextProvider>
    </NativeBaseProvider>
  );
}
