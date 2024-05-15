import { useTheme } from "native-base";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";

import {
  NotificationClickEvent,
  NotificationWillDisplayEvent,
  OSNotification,
  OneSignal,
} from "react-native-onesignal";

import { AppRoutes } from "./app.routes";
import { useEffect, useState } from "react";

import { Notification } from "../components/Notification";

const linking = {
  prefixes: ["igniteshoes://", "com.rocketseat.igniteshoes://"],
  config: {
    screens: {
      details: {
        path: "/details/:productId",
        parse: {
          productId: (productId: string) => productId,
        },
      },
      cart: {
        path: "/cart",
      },
    },
  },
};

export function Routes() {
  const { colors } = useTheme();

  const [notification, setNotification] = useState<OSNotification>();

  const theme = DefaultTheme;
  theme.colors.background = colors.gray[700];

  useEffect(() => {
    const handleNotification = (event: NotificationWillDisplayEvent): void => {
      event.preventDefault();
      const response = event.getNotification();
      setNotification(response);
    };

    OneSignal.Notifications.addEventListener(
      "foregroundWillDisplay",
      handleNotification
    );

    return () => {
      OneSignal.Notifications.removeEventListener(
        "foregroundWillDisplay",
        handleNotification
      );
    };
  }, []);

  return (
    <NavigationContainer theme={theme} linking={linking}>
      <AppRoutes />
      {!!notification && notification.title ? (
        <Notification
          data={notification}
          onClose={() => setNotification(undefined)}
        />
      ) : null}
    </NavigationContainer>
  );
}
