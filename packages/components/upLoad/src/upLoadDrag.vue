<script setup lang="ts">
import { ref } from "vue";
const isOver = ref(false);
const emit = defineEmits(["fileList"]);
function onDragOver() {
  isOver.value = true;
}
function onDrag(e: DragEvent) {
  e.stopPropagation();
  const files = e.dataTransfer?.files;
  emit("fileList", Array.from(files!));
}
</script>

<template>
  <div
    class="drag"
    @dragover.prevent="onDragOver"
    @dragleave.prevent="isOver = false"
    @drop.prevent="onDrag">
    <div>将文件拖拽到此处</div>
  </div>
</template>

<style scoped>
.drag {
  width: 100%;
  height: 100px;
  border: 2px dashed #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}
</style>
