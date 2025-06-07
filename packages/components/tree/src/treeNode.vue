<script lang="ts" setup>
import { emitEvent, treeNodeProps } from "./tree";
import { createNamespace } from "@zi-shui/utils/create";
import Swithcher from "./icon/Swithcher.vue";
import { computed } from "vue";
const bem = createNamespace("tree-node");

const props = defineProps(treeNodeProps);
const emit = defineEmits(emitEvent);
function toggle() {
  emit("toggle", props.node);
}
const isLoding = computed(() => {
  return props.isLoding.has(props.node.key!);
});
</script>

<template>
  <div :class="bem.b()">
    <div
      :class="bem.e('content')"
      :style="{ paddingLeft: `${node.levle * 16}px` }">
      <template v-if="!isLoding">
        <span
          v-if="!node.isLeaf"
          @click="toggle"
          :class="[
            bem.e('expand-icon'),
            { expanded: expended && !node.isLeaf },
          ]">
          <z-icon size="12">
            <Swithcher></Swithcher>
          </z-icon>
        </span>
      </template>
      <template v-else>
        <span :class="bem.e('isLoding-icon')">
          <!-- <z-icon size="20">
            <Loging></Loging>
          </z-icon> -->
        </span>
      </template>

      <span :class="bem.e('node-lable')">{{ node.lable }}</span>
    </div>
  </div>
</template>

<style scoped></style>
