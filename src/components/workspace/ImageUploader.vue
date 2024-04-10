<template>
  <el-upload
    v-model:file-list="computedModelValue"
    :on-change="file => handleChange(file.raw)"
    :on-exceed="files => handleChange(files[0])"
    action="#"
    list-type="picture-card"
    :on-remove="handleRemove"
    :auto-upload="false"
    :limit="1"
  >
    <el-icon><Plus /></el-icon>
  </el-upload>

  <el-dialog v-model="dialogVisible">
    <img w-full :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Plus } from '@element-plus/icons-vue';

import type { UploadProps } from 'element-plus';

const props = defineProps({
  modelValue: {
    type: String,
    default: null,
  },
});
const emit = defineEmits(['update:modelValue']);

const computedModelValue = computed({
  get() {
    if (!props.modelValue) return [];
    return [
      {
        url: props.modelValue,
      },
    ];
  },

  set(newValue) {},
});

async function handleChange(file: File) {
  const base64File =
    typeof file === 'object'
      ? await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
        })
      : '';

  emit('update:modelValue', base64File);
}

const dialogImageUrl = ref('');
const dialogVisible = ref(false);

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  emit('update:modelValue', null);
};
</script>
