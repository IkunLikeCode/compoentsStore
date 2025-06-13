<script setup lang="ts">
import upLoadContent from "./upLoadContent.vue";
import { UploadContentProps } from "./uploadContent";
import { UploadFile, UploadFiles, uploadProps, UploadRawFile } from "./upLoad";
import { computed, ref, toRef, watch } from "vue";
const props = defineProps(uploadProps);
const uploadFiles = ref<UploadFiles>(props.FileList);
const emit = defineEmits(["update:fileList"]);
const findFile = (file: UploadFile) => {
  return uploadFiles.value.find((item) => item.uid === file.uid);
};

watch(uploadFiles, (newVal) => {
  console.log(1);
  emit("update:fileList", newVal);
});

// 这里的方法都是传递给子组件 子组件内部调用 会传递一些参数过来
const upload_Content_Props = computed<UploadContentProps>(() => {
  return {
    ...props,
    // 用户选择文件后触发的
    onStart: (rawFile) => {
      const uploadFile: UploadFile = {
        uid: Date.now(),
        name: rawFile.name,
        size: rawFile.size,
        percentage: 0,
        raw: findFile(rawFile) as UploadRawFile,
        status: "starting",
        url: URL.createObjectURL(rawFile),
      };
      uploadFiles.value = [...uploadFiles.value, uploadFile];
      props.onChange(uploadFile);
    },
    onError: (err, rawFile) => {
      const uploadFile = findFile(rawFile);
      if (uploadFile) {
        uploadFile.status = "fail";
      }
      props.onError(err, rawFile, uploadFiles.value);
    },
    onProgress: (e, file) => {
      const uploadFile = findFile(file);
      if (uploadFile) {
        uploadFile.status = "uploading";
        uploadFile.percentage = Math.floor(e.percent);
      }
    },
    onRemove: (rawFile) => {
      const uploadFile = findFile(rawFile);
      if (uploadFile) {
        uploadFiles.value.splice(uploadFiles.value.indexOf(uploadFile), 1);
      }
      props.onRemove(rawFile, uploadFiles.value);
    },
    onSuccess: (res, rawFile) => {
      const uploadFile = findFile(rawFile);
      if (uploadFile) {
        uploadFile.status = "success";
      }
      props.onSuccess(res, rawFile, uploadFiles.value);
    },
  };
});

function beforeUpload(rawFile: UploadRawFile) {
  console.log(rawFile);
}

defineOptions({
  name: "z-upload",
  inheritAttrs: false,
});
</script>

<template>
  <upLoadContent v-bind="upload_Content_Props">
    <slot></slot>
  </upLoadContent>
</template>
