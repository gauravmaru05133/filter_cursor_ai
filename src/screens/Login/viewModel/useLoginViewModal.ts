import { router } from "expo-router";
import { useState } from "react";

export const useLoginViewModal = () => {
  const [url, setUrl] = useState<string>();
  const [userName, setUserName] = useState<string>();
  const [password, setPassword] = useState<string>();

  const onLoginPress = () => {
    router.navigate('/(tabs)')
  };

  return {
    url,
    setUrl,
    userName,
    setUserName,
    password,
    setPassword,
    onLoginPress
  };
};
