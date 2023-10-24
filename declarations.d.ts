declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}
