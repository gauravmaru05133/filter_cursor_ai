import { Colors } from "@/src/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.blue,
  },
  childContainer: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  imgIcon: {
    width: 300,
    height: 200,
  },
  buttonContainer: {
    width: "90%",
    backgroundColor: Colors.white,
    position: "absolute",
    bottom: 0,
  },
  txtStyles:{
    color: Colors.blue
  }
});
