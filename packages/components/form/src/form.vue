<script setup lang="ts">
import { createNamespace } from "@zi-shui/utils/create";
import { FormContextKey, formProps } from "./form";
import { onMounted, provide } from "vue";
import { FormItemContext } from "./formItem";
import { Values } from "async-validator";
const props = defineProps(formProps);
const bem = createNamespace("form");

const formItemContext: FormItemContext[] = [];
const addFormItemContext = (item: FormItemContext) => {
  formItemContext.push(item);
};
const validate = async (
  callback?: (valid: boolean, fields?: object) => void
) => {
  let errorField = {};
  for (const item of formItemContext) {
    try {
      await item.validate?.("");
    } catch (err: any) {
      errorField = { ...errorField, ...err.fields };
    }
  }

  if (Object.keys(errorField).length === 0) {
    callback?.(true);
  } else {
    callback?.(false, errorField);
  }
};

defineExpose({
  validate,
});
provide(FormContextKey, {
  ...props,
  addFormItemContext,
});
defineOptions({
  name: "z-form",
  inheritAttrs: false,
});
</script>

<template>
  <form :class="bem.b()">
    <slot></slot>
  </form>
</template>
