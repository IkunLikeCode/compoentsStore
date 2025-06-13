import { RequestOptions } from "../src/uploadContent";
import { UploadProgressEvent } from "../src/upLoad";
export default function httpRequest(options: RequestOptions) {
  const xhr = new XMLHttpRequest();
  const fromData = new FormData();
  // 监听上传进度事件
  xhr.upload.addEventListener("progress", function (e) {
    const UploadProgressEvent = e as UploadProgressEvent;
    UploadProgressEvent.percent = (e.loaded / e.total) * 100;
    options.onProgress(UploadProgressEvent);
  });
  // add header
  if (options.headers) {
    for (const [key, value] of Object.entries(options.headers)) {
      xhr.setRequestHeader(key, value);
    }
  }
  // 这里是添加表单数据，这里用的是表单上传方式，如果要上传文件，需要单独处理
  if (options.data) {
    for (const [key, value] of Object.entries(options.data)) {
      fromData.append(key, value);
    }
  }
  fromData.append(options.name, options.file);

  xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
      options.onSuccess(xhr.response);
    } else {
      options.onError(xhr.status);
    }
  };
  xhr.open(options.method, options.action);
  xhr.send(fromData);
  return xhr;
}
