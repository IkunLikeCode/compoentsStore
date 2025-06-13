// 定义formItme的props属性
// props 校验输入框的属性
//label 文本标签
// rules 校验规则
//show-message 是否显示校验信息

import type { RuleItem, Values } from "async-validator";
import { ExtractPropTypes, InjectionKey, PropType } from "vue";
export type Arrayable<T> = T | T[];
export type triggerEvent = Arrayable<string>;
// 这里基础校验规则 校验规则中是没有trigger属性的，但是这里为了方便使用，所以在这里添加了trigger属性
export interface FormItemRule extends RuleItem {
  trigger?: Arrayable<string>;
}
export const formItemValidateState = ["success", "error", ""] as const;
// 使用number这种写法可以把上面的数组转换成联合类型，这样就可以在组件中使用formItemValidateState[number]来获取其中的值了
export type FormItemValidateState = (typeof formItemValidateState)[number];

export const formItmeProps = {
  props: String,
  label: String,
  rules: [Object, Array] as PropType<Arrayable<FormItemRule>>,
  showMessage: {
    type: Boolean,
    default: true,
  },
};
export const formItemEmit = {
  validate: (trigger: triggerEvent, callback?) => Promise<void>,
};
export type FromItemProps = Partial<ExtractPropTypes<typeof formItmeProps>>;
export interface FormItemContext extends FromItemProps {
  validate: (trigger: triggerEvent, callback?) => Promise<any>;
}
export const injectKey: InjectionKey<FormItemContext> = Symbol("formItem");
