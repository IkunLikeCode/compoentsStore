<script setup lang="ts">
import { createNamespace } from "@zi-shui/utils/create";
import { computed, ref, useSlots, inject, onMounted } from "vue";
import {
  FormItemContext,
  formItemEmit,
  formItmeProps,
  injectKey,
  triggerEvent,
  FormItemValidateState,
  Arrayable,
  FormItemRule,
} from "./formItem";
import { provide } from "vue";
import { FormContextKey } from "./form";
import AsyncValidator, { Values } from "async-validator";
const bem = createNamespace("form-item");
const props = defineProps(formItmeProps);
const injectValue = inject(FormContextKey);
const validateState = ref<FormItemValidateState>("success");
const errorInfo = ref("");
const slot = useSlots();
const emit = defineEmits(formItemEmit);

const converArray = (rule: Arrayable<FormItemRule> | undefined) => {
  return rule ? (Array.isArray(rule) ? rule : [rule]) : [];
};

const _rules = computed(() => {
  const myRules = converArray(props.rules); //拿到自己本身的rule
  const formRules = injectValue?.rules;
  if (formRules && props.props) {
    // 跟form的rule合并一下
    myRules.push(...converArray(formRules[props.props]));
  }
  return myRules;
});
const getRulesFiled = (trigger: triggerEvent) => {
  const rules = _rules.value;
  return rules.filter((rule) => {
    if (!rule.trigger || !trigger) return true;
    if (Array.isArray(rule.trigger)) {
      return rule.trigger.includes(trigger as string);
    }
    return rule.trigger === trigger;
  });
};

const onSuccess = () => {
  validateState.value = "success";
  errorInfo.value = "";
};
const onFail = (err: Values) => {
  validateState.value = "error";
  errorInfo.value = err ? err.errors[0].message : "校验失败";
};

const validate: FormItemContext["validate"] = async (trigger) => {
  const r = getRulesFiled(trigger);
  const modelName = props.props;
  const validator = new AsyncValidator({
    [modelName as string]: r,
  });
  const model = (injectValue?.model ?? {})[modelName as string];
  return new Promise((resolve, reject) => {
    validator
      .validate({
        [modelName as string]: model,
      })
      .then(() => {
        onSuccess();
        resolve(true);
      })
      .catch((err: Values) => {
        onFail(err);
        reject(err);
      });
  });
};

provide(injectKey, {
  ...props,
  validate,
});
onMounted(() => {
  injectValue?.addFormItemContext({
    ...props,
    validate,
  } as FormItemContext);
});

defineOptions({
  name: "z-form-item",
  inheritAttrs: false,
});
</script>

<template>
  <div :class="[bem.b()]">
    <div :class="[bem.b('container')]">
      <label :class="[bem.b('label')]" v-if="slot.label || props.label">
        <slot v-if="slot.label" name="label"> </slot>
        <span v-else>{{ props.label }}</span>
      </label>
      <div :class="[bem.b('content')]">
        <div :class="[bem.b('inner')]">
          <slot name="default"></slot>
        </div>
        <div :class="[bem.b('error')]" v-if="slot.error || errorInfo">
          <slot name="error" v-if="slot.error"> </slot>
          <span v-else>{{ errorInfo }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
