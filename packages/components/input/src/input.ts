import { ExtractPropTypes, PropType, toValue } from "vue";
import isString from "@zi-shui/utils/isSting";
export type Type =
  | "text"
  | "textarea"
  | "password"
  | "button"
  | "checkbox"
  | "file"
  | "number";

export const inputProps = {
  type: {
    type: String as PropType<Type>,
    validator: (value: string) => {
      return [
        "text",
        "textarea",
        "password",
        "button",
        "checkbox",
        "file",
      ].includes(value);
    },
  },
  modelValue: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  clearable: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
  },
  readonly: {
    type: Boolean,
  },
  label: {
    type: String,
    default: "",
  },
  showPassword: {
    type: Boolean,
  },
};

export type InputProps = ExtractPropTypes<typeof inputProps>;

export const inputEmits = {
  "update:modelValue": (value: string) => isString(value),
  input: (value: string) => isString(value),
  change: (value: string) => isString(value),
  clear: () => true,
  blur: (event: FocusEvent) => event instanceof FocusEvent,
  focus: (event: FocusEvent) => event instanceof FocusEvent,
};
