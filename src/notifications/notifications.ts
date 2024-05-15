import { OneSignal } from "react-native-onesignal";

export function tagUserInfoCreate() {
  OneSignal.User.addTags({
    user_name: "Vitor Santana",
    user_email: "vsantana.emulator@email.com",
  });
}

export function tagCartUpdate(itemsCount: string) {
  OneSignal.User.addTag("cart_items_count", itemsCount);
}
