import _Tree from "./src/tree.vue";
import withInstall from "@zi-shui/utils/withInstall";
const Tree = withInstall(_Tree);

export default Tree;
declare module "vue" {
  export interface GlobalComponents {
    "z-tree": typeof Tree;
  }
}
