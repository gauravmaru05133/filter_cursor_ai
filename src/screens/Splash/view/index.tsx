import { images } from "@/src/assets/images";
import CommonButton from "@/src/component/AppButton";
import { CommonImage } from "@/src/component/CommonImageComponent";
import { strings } from "@/src/constants/strings";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../style";
import { useSplashViewModel } from "../viewModel/useSplashViewModel";

export const SplashView = () => {
  const { onPressLogin } = useSplashViewModel();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.childContainer}>
        <CommonImage
          source={images.logo}
          style={styles.imgIcon}
          resizeMode="contain"
        />

        <CommonButton
          title={strings.login}
          pressContainer={styles.buttonContainer}
          txtStyle={styles.txtStyles}
          onPress={onPressLogin}
        />
      </View>
    </SafeAreaView>
  );
};
