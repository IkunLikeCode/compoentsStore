import { PropType, ExtractPropTypes } from "vue";
import {
  beseProps,
  UploadProgressEvent,
  UploadRawFile,
  uploadProps,
} from "./upLoad";
const NOOP = () => {};

export const uploadContentProps = {
  ...beseProps,
  beforeUpload: uploadProps["beforeUpload"],
  onStart: {
    type: Function as PropType<(rawFile: UploadRawFile) => void>,
    default: NOOP,
  },
  onProgress: {
    type: Function as PropType<
      (e: UploadProgressEvent, rawFile: UploadRawFile) => void
    >,
    default: NOOP,
  },
  onRemove: {
    type: Function as PropType<(rawFile: UploadRawFile) => void>,
    default: NOOP,
  },
  onError: {
    type: Function as PropType<(err: Error, rawFile: UploadRawFile) => void>,
    default: NOOP,
  },
  onSuccess: {
    type: Function as PropType<(response: any, rawFile: UploadRawFile) => void>,
    default: NOOP,
  },
} as const;

export type UploadContentProps = ExtractPropTypes<typeof uploadContentProps>;

export interface RequestOptions {
  method: string;
  file: File;
  name: string;
  action: string;
  headers: object;
  data: Record<string, any>;
  onError: (e: any) => void;
  onProgress: (e: UploadProgressEvent) => void;
  onSuccess: (res: any) => void;
}
