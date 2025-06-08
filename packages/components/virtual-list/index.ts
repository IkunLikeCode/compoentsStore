import Virtual from "./src/virtual";
import withInstall from "@zi-shui/utils/withInstall";
const Tree = withInstall(Virtual);

export default Tree;
declare module "vue" {
  export interface GlobalComponents {
    "z-virtual-list": typeof Tree;
  }
}
