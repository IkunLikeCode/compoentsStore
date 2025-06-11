import withInstall from "@zi-shui/utils/withInstall";
import _Input from "./src/input.vue";
const Input = withInstall(_Input);
export default Input;
export * from "./src/input";
declare module "vue" {
  export interface GlobalComponents {
    "z-input": typeof Input;
  }
}
