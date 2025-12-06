import * as React from "react";
import Svg, { Rect, SvgProps } from "react-native-svg";
export const NavigationBar : React.FC<SvgProps>  = (props) => (
  <Svg
    width={props?.width ?? 36}
    height={props?.height ?? 5}
    viewBox="0 0 36 5"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Rect width={36} height={5} rx={2.5} fill={props?.fill ?? "#A7A3B3"} />
  </Svg>
);
