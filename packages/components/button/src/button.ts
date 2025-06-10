import { ExtractPropTypes, PropType, DefineComponent } from "vue";

export type Size = "small" | "medium" | "large";
export type Type =
  | "default"
  | "primary"
  | "success"
  | "warning"
  | "danger"
  | "info";

export type NativeType = "button" | "submit" | "reset";

export const buttonProps = {
  size: {
    type: String as PropType<Size>,
  },
  type: {
    type: String as PropType<Type>,
    validator: (value: Type) => {
      return [
        "default",
        "primary",
        "success",
        "warning",
        "danger",
        "info",
      ].includes(value);
    },
    default: "success",
  },
  disabled: Boolean,
  nativeType: {
    type: String as PropType<NativeType>,
    validator: (value: NativeType) => {
      return ["button", "submit", "reset"].includes(value);
    },
    default: "button",
  },
  loading: Boolean,
  icon: String as PropType<any>,

  round: Boolean,
};
export const buttonEmits = ["click"];
export type TreeProps = Partial<ExtractPropTypes<typeof buttonProps>>;
