import _Virtual from "./src/virtual";
import withInstall from "@zi-shui/utils/withInstall";
const Virtual = withInstall(_Virtual);

export default Virtual;
declare module "vue" {
  export interface GlobalComponents {
    "z-virtual-list": typeof Virtual;
  }
}
