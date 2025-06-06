// 引入组件
import _Icon from "./src/icon.vue";
import withInstall from "@zi-shui/utils/withInstall";
const Icon = withInstall(_Icon);

// 默认输出组件
export default Icon;
export * from "./src/icon";

// 手动声明全局组件 把组件导出给全局注册使用
declare module "vue" {
  export interface GlobalComponents {
    "z-icon": typeof Icon;
  }
}
