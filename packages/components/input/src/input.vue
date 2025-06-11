<script setup lang="ts">
import { useAttrs, useSlots, useTemplateRef, shallowRef, computed } from "vue";
import { createNamespace } from "@zi-shui/utils/create";
import { inputProps, inputEmits } from "./input";
import CloseIcon from "./icon/CloseIcon.vue";
import Eye from "./icon/Eye.vue";
import EyeClose from "./icon/Eye-close.vue";
const inputRef = useTemplateRef<HTMLInputElement>("inputRef");
const bem = createNamespace("input");
const isFocus = shallowRef(false);
const isShowEye = shallowRef(false);
const props = defineProps(inputProps);
const emit = defineEmits(inputEmits);
let oldPassword = "";

// 接收所有自定义属性
const attr = useAttrs();
const slots = useSlots();

const inputHandle = (e: Event) => {
  let { value } = e.target as HTMLInputElement;
  oldPassword += value;
  if (e instanceof Event) {
    emit("update:modelValue", value);
    emit("input", value);
  }
};
// 注册change事件
const changeHandle = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit("change", target.value);
};
// 注册focus事件
const focusHandle = (e: FocusEvent) => {
  emit("focus", e);
  if (inputRef.value) inputRef.value.focus();
  isFocus.value = true;
};
const clearHandle = () => {
  emit("clear");
  if (inputRef.value) {
    emit("update:modelValue", "");
    inputRef.value.focus();
  }
};
const blurHandle = (e: FocusEvent) => {
  emit("blur", e);
  if (inputRef.value) inputRef.value.blur();
};

const changeShowPassword = (eye: string) => {
  if (props.showPassword) {
    if (eye === "eyeClose") {
      isShowEye.value = true;
    } else {
      isShowEye.value = false;
    }
  }
};

// 是否展示密码
const isPassword = computed(() => {
  if (props.type === "password") {
    return true;
  }
  return false;
});
defineOptions({
  name: "z-input",
  inheritAttrs: false,
});
</script>

<template>
  <div :class="bem.b()">
    <div :class="bem.m('label')" v-if="label">
      {{ label }}
    </div>
    <div v-if="slots.prepend" :class="bem.be('group', 'prepend')">
      <slot name="prepend"></slot>
    </div>
    <div :class="[bem.e('wrapper')]">
      <span class="left" v-if="slots.prefixIco">
        <slot name="prefixIco"></slot>
      </span>
      <input
        id="input"
        :type="isPassword ? (isShowEye ? 'text' : 'password') : type"
        :disabled="disabled"
        ref="inputRef"
        :placeholder="placeholder"
        :value="modelValue"
        @input="(e) => inputHandle(e)"
        @change="changeHandle"
        @clear="clearHandle"
        @blur="blurHandle"
        @focus="focusHandle"
        v-bind="attr"
        :class="[bem.e('inner'), bem.is('disabled', disabled)]" />
      <span class="right" v-if="slots.suffixIcon || clearable || showPassword">
        <span class="right" v-if="clearable && isFocus" @click="clearHandle">
          <z-icon name="close">
            <CloseIcon></CloseIcon>
          </z-icon>
        </span>
        <span
          @click="changeShowPassword('eyeClose')"
          class="right"
          v-if="showPassword && !isShowEye">
          <z-icon>
            <EyeClose></EyeClose>
          </z-icon>
        </span>
        <span @click="changeShowPassword('eye')" class="right" v-if="isShowEye">
          <z-icon>
            <Eye></Eye>
          </z-icon>
        </span>
        <slot v-else name="suffixIcon"></slot>
      </span>
    </div>
    <div v-if="slots.append" :class="bem.be('group', 'append')">
      <slot name="append"></slot>
    </div>
  </div>
</template>
