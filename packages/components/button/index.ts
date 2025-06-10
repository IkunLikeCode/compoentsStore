import _Button from "./src/button.vue";
import withInstall from "@zi-shui/utils/withInstall";
const Button = withInstall(_Button);
export default Button;
export * from "./src/button";

declare module "vue" {
  export interface GlobalComponents {
    "z-button": typeof Button;
  }
}
