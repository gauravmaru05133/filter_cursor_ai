import { Search } from "@/src/assets/icons/Search";
import { Header } from "@/src/component/Header";
import Input from "@/src/component/Input";
import AppText from "@/src/component/Text";
import { strings } from "@/src/constants/strings";
import { Spacing } from "@/src/constants/theme";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from "../styles";
import { useShipmentsViewModal } from "../viewModel/useShipmentsViewModal";

export const Shipments = () => {
  const { searchs, setSearch } = useShipmentsViewModal();
  return (
    <View style={{ flex: 1, backgroundColor: "red" }}>
      <SafeAreaView style={styles.safeAreaContainer} edges={["top", "bottom"]}>
        <Header />
        <View
          style={{
            flex: 1,
            paddingHorizontal: Spacing.sp16,
            marginTop: Spacing.sp10,
          }}
        >
          <AppText style={styles.helloTxt}>Hello,</AppText>
          <AppText style={styles.nameTxt}>Ibrahim Shaker</AppText>

          <Input
            value={searchs}
            onChangeText={setSearch}
            placeholder={strings.search}
            leftIcon={<Search />}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
