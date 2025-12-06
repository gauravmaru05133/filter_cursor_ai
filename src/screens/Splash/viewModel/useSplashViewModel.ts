import { router } from "expo-router";

export const useSplashViewModel = () => {
  const onPressLogin = () => {
    router.navigate("/login");
  };

  return {
    onPressLogin,
  };
};
