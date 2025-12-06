import { NotificationIcon } from "@/src/assets/icons/NotificationIcon";
import { images } from "@/src/assets/images";
import { View } from "react-native";
import { CommonImage } from "../CommonImageComponent";
import { styles } from "./styles";

export const Header = () => {
  return (
    <View style={styles.container}>
      <CommonImage source={images.avatarLogo} style={styles.avatarImg} />
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignContent: "center",
          alignItems: "center",
        }}
      >
        <CommonImage
          source={images.appLogoColor}
          style={styles.appLogoStyle}
          resizeMode="cover"
        />
      </View>
      <NotificationIcon/>
    </View>
  );
};
