import { LeftIcon } from "@/src/assets/icons/LeftIcon";
import { NavigationBar } from "@/src/assets/icons/NavigationBar";
import CommonButton from "@/src/component/AppButton";
import Input from "@/src/component/Input";
import AppText from "@/src/component/Text";
import { strings } from "@/src/constants/strings";
import React from "react";
import { View } from "react-native";
import { styles } from "../styles";
import { useLoginViewModal } from "../viewModel/useLoginViewModal";

export const Login = () => {
  const {
    userName,
    url,
    password,
    setPassword,
    setUrl,
    setUserName,
    onLoginPress,
  } = useLoginViewModal();

  return (
    <View style={styles.container}>
      <View style={styles.navigationContainer}>
        <NavigationBar />
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.leftIconContainer}>
          <LeftIcon />
          <AppText style={styles.cancelTxt}>{strings.cancel}</AppText>
        </View>
        <View style={styles.loginChildContainer}>
          <AppText style={styles.loginTxtContainer}>{strings.login}</AppText>

          <AppText style={styles.loginMsg}>{strings.loginMsg}</AppText>

          <Input
            value={url}
            onChangeText={setUrl}
            label={strings.url}
            placeholder={strings.url}
            prefix={url?.length > 0 && strings.https}
          />

          <Input
            value={userName}
            onChangeText={setUserName}
            label={strings.usrNameEmail}
            placeholder={strings.usrNameEmail}
          />

          <Input
            value={password}
            onChangeText={setPassword}
            label={strings.password}
            placeholder={strings.password}
            secureTextEntry
          />
          <View style={{ flex: 1 }} />
          <CommonButton
            title={strings.login}
            disabled={!userName || !url || !password}
            onPress={onLoginPress}
            pressContainer={styles.loginBtnParentContainer}
          />
        </View>
      </View>
    </View>
  );
};
