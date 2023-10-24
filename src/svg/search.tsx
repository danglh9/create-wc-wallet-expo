import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

function Search(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20}
      height={20}
      fill="none"
      viewBox="0 0 20 20"
      {...props}
    >
      <Circle cx={9.583} cy={9.583} r={7.75} stroke="#7C7C84" strokeWidth={2} />
      <Path
        stroke="#7C7C84"
        strokeLinecap="round"
        strokeWidth={2}
        d="M15 15.833l2.5 2.5"
      />
    </Svg>
  );
}

export default Search;
