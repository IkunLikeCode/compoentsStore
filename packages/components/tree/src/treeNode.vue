<script lang="ts" setup>
import { emitEvent, treeNodeProps } from "./tree";
import { createNamespace } from "@zi-shui/utils/create";
import Swithcher from "./icon/Swithcher.vue";
const bem = createNamespace("tree-node");

const props = defineProps(treeNodeProps);
const emit = defineEmits(emitEvent);
function toggle() {
  emit("toggle", props.node);
}
</script>

<template>
  <div :class="bem.b()">
    <div
      :class="bem.e('content')"
      :style="{ paddingLeft: `${node.levle * 16}px` }">
      <span
        v-if="!node.isLeaf"
        @click="toggle"
        :class="[bem.e('expand-icon'), { expanded: expended && !node.isLeaf }]">
        <z-icon size="12">
          <Swithcher></Swithcher>
        </z-icon>
      </span>
      <span :class="bem.e('node-lable')">{{ node.lable }}</span>
    </div>
  </div>
</template>

<style scoped></style>
