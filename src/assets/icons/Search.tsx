import * as React from "react";
import Svg, { Path, SvgProps } from "react-native-svg";
export const Search: React.FC<SvgProps> = (props) => (
  <Svg
    width={props?.width ?? 24}
    height={props?.height ?? 24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <Path
      d="M16.927 17.0401L20.4001 20.4001M19.2801 11.4401C19.2801 15.77 15.77 19.2801 11.4401 19.2801C7.11019 19.2801 3.6001 15.77 3.6001 11.4401C3.6001 7.11019 7.11019 3.6001 11.4401 3.6001C15.77 3.6001 19.2801 7.11019 19.2801 11.4401Z"
      stroke={props?.stroke ?? "#A7A3B3"}
      strokeWidth={2}
      strokeLinecap="round"
    />
  </Svg>
);
