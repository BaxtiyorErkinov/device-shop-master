<script lang="ts" setup>
import { computed, useSlots } from 'vue';
import { ITableProps } from './DataTable.types';
import { ElTable } from 'element-plus';
import { convertDate } from '@/utils/helpers';

const props = withDefaults(defineProps<ITableProps>(), {
  loading: false,
});
const slots = useSlots();

const defaultHeaders = computed(() => {
  if (!props.headers) return [];

  return props.headers.filter(item => {
    return !slots[`item.${item.key}`] && !item?.type;
  });
});

const customHeaders = computed(() => {
  if (!props.headers) return [];

  return props.headers.filter(item => {
    return slots[`item.${item.key}`] || item.type !== undefined;
  });
});

function detectSlotExistence(slotName: string) {
  return slots[slotName];
}
</script>

<template>
  <el-table :data="items" v-loading="loading" stripe style="width: 100%">
    <!-- default rendering -->

    <el-table-column
      v-for="col in customHeaders"
      :label="col.title"
      :key="col.key"
    >
      <template #default="scope">
        <template v-if="col.type === 'formatted_number'">
          {{ Number(scope.row[col.key])?.toLocaleString('ru') }}
        </template>
        <template v-else-if="col.type === 'date'">
          {{ convertDate(scope.row[col.key]) }}
        </template>
        <slot v-else :name="`item.${col.key}`" :item="scope.row" />
      </template>
    </el-table-column>

    <el-table-column
      v-for="col in defaultHeaders"
      :key="col.key"
      :prop="col.key"
      :label="col.title"
    />

    <el-table-column
      fixed="right"
      label="Действия"
      width="120"
      v-if="detectSlotExistence('actions')"
    >
      <template #default="scope">
        <slot name="actions" :item="scope.row"></slot>
      </template>
    </el-table-column>

    <!-- custom columns with slots -->

    <template #append>
      <slot name="bottom" />
    </template>
  </el-table>
</template>
