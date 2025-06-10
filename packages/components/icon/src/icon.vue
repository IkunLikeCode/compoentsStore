<script setup lang="ts">
import { computed } from "vue";
import { createNamespace } from "@zi-shui/utils/create";
import { IconProps } from "./icon";
const bem = createNamespace("icon");
defineOptions({ name: "z-icon" });
const props = defineProps<IconProps>();

// 计算样式
const sytle = computed(() => {
  if (!props.color && !props.size) return {};
  return {
    color: props.color,
    fontSize: `${props.size}px`,
  };
});
</script>

<template>
  <i :class="bem.b()" :style="sytle"> <slot></slot></i>
</template>
