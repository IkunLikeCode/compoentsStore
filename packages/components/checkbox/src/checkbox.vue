<script setup lang="ts">
import { createNamespace } from "@zi-shui/utils/create";
const bem = createNamespace("checkbox");

defineOptions({ name: "z-checkbox" });
</script>

<template>
  <div :class="bem.b()"></div>
</template>

<style lang="less" scoped></style>
