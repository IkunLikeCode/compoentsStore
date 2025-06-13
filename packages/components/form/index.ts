import withInstall from "@zi-shui/utils/withInstall";
import _FormItem from "./src/formItem.vue";
import _Form from "./src/form.vue";
const FormItem = withInstall(_FormItem);
const Form = withInstall(_Form);

export { FormItem, Form };

export type { formItmeProps } from "./src/formItem.ts";
export type { formProps } from "./src/form";

declare module "vue" {
  export interface GlobalComponents {
    "z-form-item": typeof FormItem;
    "z-form": typeof Form;
  }
}
