<script setup lang="ts">
import { createNamespace } from "@zi-shui/utils/create";
import { uploadContentProps } from "./uploadContent";
import { useTemplateRef } from "vue";
import { UploadProgressEvent, UploadRawFile } from "./upLoad";
import httpRequest from "../util/ajax";
import UpLoadDrag from "./upLoadDrag.vue";
const bem = createNamespace("upLoadContent");
const props = defineProps(uploadContentProps);
const inputRef = useTemplateRef<HTMLInputElement>("inputRef");
async function uploadHanlde(file: UploadRawFile) {
  // 在上传之前
  if (props.beforeUpload) {
    const result = await props.beforeUpload(file);
    if (result === false) return props.onRemove(file);
  }
  // 开始上传文件
  props.onStart(file);
  const { method, action, name, data, headers } = props;
  httpRequest({
    method,
    action,
    name,
    data,
    headers,
    file: file,
    onProgress: (e: UploadProgressEvent) => {
      props.onProgress(e, file);
    },
    onSuccess: (res) => {
      props.onSuccess(res, file);
    },
    onError: (err) => {
      props.onError(err, file);
    },
  });
}
function handleChange(e: Event) {
  const files = (e.target as HTMLInputElement).files;
  if (files) {
    for (let i = 0; i < files?.length; i++) {
      const file = files[i] as UploadRawFile;
      file.uid = Date.now() + i; // 生成一个唯一的id
      uploadHanlde(file);
    }
  }
}
// 获取拖拽事件收集的文件列表
function fileListHandle(files) {
  for (let i = 0; i < files.length; i++) {
    const file = files[i] as UploadRawFile;
    file.uid = Date.now() + i;
    uploadHanlde(file);
  }
}

// 点击触发按钮的点击
function handleClick() {
  inputRef.value!.value = "";
  inputRef.value!.click();
}

defineOptions({
  name: "z-upload-content",
  inheritAttrs: false,
});
</script>

<template>
  <div :class="[bem.b()]" @click="handleClick">
    <template v-if="drag">
      <UpLoadDrag @file-list="fileListHandle">
        <slot></slot>
      </UpLoadDrag>
    </template>
    <template v-else>
      <slot></slot>
    </template>
    <input
      ref="inputRef"
      type="file"
      :name="name"
      :accept="accept"
      :multiple="multiple"
      @change="handleChange" />
  </div>
</template>
