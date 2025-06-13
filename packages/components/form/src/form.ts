import type { ExtractPropTypes, InjectionKey, PropType } from "vue";
import { Arrayable, FormItemContext, FormItemRule } from "./formItem";
export const formProps = {
  model: Object,
  rules: {
    type: Object as PropType<Record<string, Arrayable<FormItemRule>>>,
  },
  showMessage: {
    type: Boolean,
    default: true,
  },
} as const;
export type FormProps = Partial<ExtractPropTypes<typeof formProps>>;
export interface FormContext extends FormProps {
  addFormItemContext: (item: FormItemContext) => void;
}
export const FormContextKey: InjectionKey<FormContext> = Symbol("formContext");
