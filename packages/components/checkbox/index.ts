// 引入组件
import _Checkbox from "./src/checkbox.vue";
import withInstall from "@zi-shui/utils/withInstall";
const Checkbox = withInstall(_Checkbox);

// 默认输出组件
export default Checkbox;
export * from "./src/checkbox";

// 手动声明全局组件 把组件导出给全局注册使用
declare module "vue" {
  export interface GlobalComponents {
    "z-checkbox": typeof Checkbox;
  }
}
