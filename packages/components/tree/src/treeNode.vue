<script lang="ts" setup>
import { emitEvent, treeInjectKey, treeNodeProps } from "./tree";
import { createNamespace } from "@zi-shui/utils/create";
import Swithcher from "./icon/Swithcher.vue";
import treeNodeContext from "./treeNodeContext";
import { computed, inject, useSlots } from "vue";
const bem = createNamespace("tree-node");

const props = defineProps(treeNodeProps);
const emit = defineEmits(emitEvent);
function toggle() {
  emit("toggle", props.node);
}
const isLoding = computed(() => {
  return props.isLoding.has(props.node.key!);
});

const onChoseHandle = () => {
  emit("choseHandle", props.node);
};
// 是否选中节点 方便添加样式
const isChose = computed(() => {
  return props.choseList.has(props.node.key!);
});

const treeContext = inject(treeInjectKey);
</script>

<template>
  <div :class="[bem.b(), bem.is('select', isChose)]" @click="onChoseHandle()">
    <div
      :class="[bem.e('content')]"
      :style="{ paddingLeft: `${node.levle * 16}px` }">
      <template v-if="!isLoding">
        <span
          v-if="!node.isLeaf"
          @click.stop="toggle"
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
      <span :class="bem.e('node-lable')">
        <treeNodeContext
          :node="props.node"
          :slot="treeContext?.slots!"></treeNodeContext>
      </span>
    </div>
  </div>
</template>

<style scoped></style>
