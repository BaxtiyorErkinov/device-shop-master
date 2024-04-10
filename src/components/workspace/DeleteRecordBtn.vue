<template>
  <el-button type="danger" :icon="Delete" circle size="large" @click="open" />
</template>

<script lang="ts" setup>
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete } from '@element-plus/icons-vue';

const props = defineProps({
  item: {
    type: Object as PropType<Record<string, any> & { id: number }>,
    required: true,
  },
  apiProvider: {
    type: Function as PropType<(id: number) => Promise<any>>,
    required: true,
  },
});
const emit = defineEmits(['success']);

const open = () => {
  ElMessageBox({
    title: 'Вы действительно хотите удалить?',
    showCancelButton: true,
    confirmButtonText: 'Да',
    confirmButtonClass: 'confirm-btn',
    cancelButtonText: 'Нет',
    beforeClose: (action, instance, done) => {
      if (action === 'confirm') {
        instance.confirmButtonLoading = true;
        instance.confirmButtonText = 'Запрос обрабатывается...';
        props.apiProvider(props.item.id).then(() => {
          done();
          setTimeout(() => {
            instance.confirmButtonLoading = false;
          }, 300);
        });
      } else {
        done();
      }
    },
  }).then(action => {
    ElMessage({
      type: 'success',
      message: `Успешно удалено`,
    });
    emit('success');
  });
};
</script>

<style>
.confirm-btn {
  background-color: #f56c6c !important;
  border-color: #f56c6c !important;
}
</style>
