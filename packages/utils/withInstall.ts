import type { App, Plugin } from "vue";
// 为组件提供 install 安装方法，供按需引入
export type SFCWithInstall<T> = T & Plugin;
export default function withInstall<T>(com: T) {
  (com as SFCWithInstall<T>).install = function (app: App) {
    const { name } = com as unknown as { name: string };
    app.component(name, com as Plugin);
  };
  return com as SFCWithInstall<T>;
}
