// 定义组件的类型和props emit

import { PropType } from "vue";

// 文件类型
export interface UploadFile {
  uid?: number; //唯一标识符
  name: string; //文件名
  url?: string; //文件链接地址
  percentage?: number; //百分比进度值
  raw?: File; //ts中内置的File类型
  size?: number; //文件大小
  status?: string; //文件状态，例如：'ready', 'uploading', 'success', 'failed'
}
export type UploadFiles = UploadFile[];

// Props
export const beseProps = {
  FileList: {
    // 文件列表
    type: Array as PropType<UploadFiles>,
    default: () => [],
  },
  // 是否多选
  multiple: {
    type: Boolean,
    default: false,
  },
  // input中所需要的类型
  name: {
    type: String,
    default: "file",
  },
  accept: {
    type: String,
    default: "",
  },
  // 上传文件需要的ajax类型
  method: {
    type: String,
    default: "post",
  },
  headers: {
    type: Object,
    default: () => {},
  },
  action: {
    //上传的地址
    type: String,
    default: "",
  },
  data: {
    type: Function,
    default: () => {},
  },
  drag: {
    type: Boolean,
    default: false,
  },
};

export type UploadRawFile = File & { uid: number };
export type UploadProgressEvent = ProgressEvent & {
  percent: number;
};

export const uploadProps = {
  ...beseProps,
  onPreview: {
    type: Function as PropType<(file: UploadFile) => void>,
    default: () => {},
  },
  beforeUpload: {
    type: Function as PropType<(file: UploadRawFile) => Promise<boolean>>,
  },
  onChange: {
    type: Function as PropType<(file: UploadFile) => void>,
    default: () => {},
  },
  beforeRemove: {
    type: Function as PropType<
      (file: UploadFile, uploadFiles: UploadFiles) => Promise<boolean>
    >,
    default: () => {},
  },
  onRemove: {
    type: Function as PropType<
      (file: UploadFile, uploadFiles: UploadFiles) => void
    >,
    default: () => {},
  },
  onProgress: {
    type: Function as PropType<
      (
        file: UploadProgressEvent,
        uoloadFile: UploadFile,
        uploadFiles: UploadFiles
      ) => void
    >,
    default: () => {},
  },
  onSuccess: {
    type: Function as PropType<
      (response: any, file: UploadFile, files: UploadFiles) => void
    >,
    default: () => {},
  },
  onError: {
    type: Function as PropType<
      (error: any, file: UploadFile, files: UploadFiles) => void
    >,
    default: () => {},
  },
};
