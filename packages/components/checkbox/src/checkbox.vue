<script setup lang="ts">
import { createNamespace } from "@zi-shui/utils/create";
import { checkbox, checkboxEmits } from "./checkbox";
import { computed, onMounted, useTemplateRef, watch } from "vue";
const bem = createNamespace("checkbox");
const props = defineProps<checkbox>();
const emit = defineEmits(checkboxEmits);
const input = useTemplateRef<HTMLInputElement>("input");
const model = computed({
  get: () => props.checked,
  set: (val) => emit("update:checked", val),
});

function indeterminateFn(value: boolean) {
  if (input.value) {
    input.value.indeterminate = value;
  }
}

function handleChange(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("change", target.checked);
}

watch(() => props.indeterminate, indeterminateFn);

onMounted(() => {
  indeterminateFn(props.indeterminate);
});

defineOptions({ name: "z-checkbox" });
</script>
<!-- input 之所以用点击 是因为要消除事件冒泡  -->
<template>
  <label :class="bem.b()">
    <span :class="bem.e('input')">
      <input
        @click.stop="handleChange"
        ref="input"
        v-model="model"
        type="checkbox" />
    </span>
    <span :class="bem.e('text')">
      {{ props.label }}
    </span>
  </label>
</template>

<style lang="less" scoped></style>
