<script lang="ts" setup>
import DataTable from '@/components/ui/DataTable/DataTable.vue';
import { ITableProps } from '@/components/ui/DataTable/DataTable.types';
import { Nullable } from '@/@types/utility.types';
import { type ICrudTemplateMethods } from '@/@types/repository.types';
import { PAGINATION_PER_PAGE } from '@/constants/index';
import { useDebounce } from '@/composables/useDebounce';
import DeleteRecordBtn from '@/components/workspace/DeleteRecordBtn.vue';
import { returnFilledProperties } from '@/utils/helpers';

interface IProps extends ITableProps {
  apiProvider?: Nullable<Partial<ICrudTemplateMethods>>;
  getAllApiProvider?: Nullable<(...args: any[]) => Promise<any>>;
  externalFilters: object | null;
}

const props = withDefaults(defineProps<IProps>(), {
  apiProvider: null,
  headers: null,
  externalFilters: null,
});

const slots = useSlots();
const data: Ref<any[]> = ref([]);
const loading = ref(false);
const currentPage = ref(1);
const lastPage = ref(1);
const debounce = useDebounce();
const filters = ref({});

const customHeaders = computed(() => {
  if (!props.headers) return [];

  return props.headers.filter(item => {
    return slots[`item.${item.key}`];
  });
});

const computedFilters = computed(() => {
  return {
    ...filters.value,
    ...props.externalFilters,
  };
});

function loadItems() {
  console.log(props.apiProvider);
  const getAllApi = (props.getAllApiProvider ??
    props.apiProvider?.getAll?.bind(
      props.apiProvider,
    )) as ICrudTemplateMethods['getAll'];

  if (!getAllApi) return;

  loading.value = true;
  let query = {
    _page: currentPage.value,
    _per_page: PAGINATION_PER_PAGE,
    ...returnFilledProperties(computedFilters.value),
  };

  if (currentPage.value <= lastPage.value) {
    getAllApi(query)
      .then(res => {
        const totalItems = res.headers['x-total-count'];
        lastPage.value = Math.ceil(
          Number.parseInt(totalItems) / PAGINATION_PER_PAGE,
        );

        data.value = res.data;
      })
      .finally(() => {
        loading.value = false;
      });
  }
}

watch(
  () => currentPage.value,
  () => {
    debounce(loadItems, 500);
  },
  {
    immediate: true,
  },
);

watch(
  () => computedFilters.value,
  () => {
    currentPage.value = 1;
    lastPage.value = 1;
    debounce(loadItems, 500);
  },
);

defineExpose({
  loadItems,
});
</script>

<template>
  <div class="server-data-table">
    <el-card
      class="filters__container"
      body-class="server-data-table__filters"
      shadow="never"
    >
      <slot name="filters" />
    </el-card>
    <data-table
      :headers="headers"
      :items="data"
      :loading="loading"
      class="server-data-table"
    >
      <template
        v-for="col in customHeaders"
        v-slot:[`item.${col.key}`]="{ item }"
      >
        <slot :name="`item.${col.key}`" :item="item" />
      </template>
      <template #bottom>
        <div class="server-data-table__bottom">
          <el-pagination
            :page-size="1"
            :pager-count="11"
            v-model:current-page="currentPage"
            layout="prev, pager, next"
            :total="lastPage"
            background
          />
        </div>
      </template>

      <template #actions="{ item }">
        <slot name="actions" :item="item" />
        <delete-record-btn
          :api-provider="apiProvider?.delete?.bind(apiProvider)"
          :item="item"
          @success="loadItems()"
        />
      </template>
    </data-table>
  </div>
</template>

<style>
.server-data-table {
}

.server-data-table .filters__container {
  margin-bottom: 5px;
}

.server-data-table .server-data-table__filters {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 20px 10px;
}

.server-data-table thead tr th {
  padding: 12px 5px !important;
}

.server-data-table__bottom {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 10px;
}

.server-data-table .el-pagination .el-pager {
}

.server-data-table .el-pagination .btn-prev .el-icon {
  font-size: 18px;
}

.server-data-table .el-pagination .btn-next .el-icon {
  font-size: 18px;
}

.server-data-table .el-pagination .el-pager .btn-next {
}

.server-data-table .el-pagination .el-pager .number {
  font-size: 16px;
}
</style>
