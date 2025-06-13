import withInstall from "@zi-shui/utils/withInstall";
import _Upload from "./src/upLoad.vue";
const Upload = withInstall(_Upload);

export default Upload;

declare module "vue" {
  export interface GlobalComponents {
    "z-upload": typeof Upload;
  }
}
