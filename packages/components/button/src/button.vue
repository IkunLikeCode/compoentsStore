<script setup lang="ts">
import { createNamespace } from "@zi-shui/utils/create";
import { buttonEmits, buttonProps } from "./button";
const bem = createNamespace("button");
defineProps(buttonProps);

const emit = defineEmits(buttonEmits);
defineOptions({
  name: "z-button",
  inheritAttrs: false,
});
function click(e: Event) {
  emit("click", e);
}
</script>

<template>
  <button
    @click="click"
    :class="[
      bem.b(),
      bem.m(type),
      bem.m(size),
      bem.is('round', round),
      bem.is('loading', loading),
      bem.is('disabled', disabled),
      bem.is('icon', icon ? true : false),
    ]"
    :type="nativeType">
    <template v-if="icon">
      <z-icon :size="20">
        <component :is="icon"></component>
      </z-icon>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </button>
</template>
