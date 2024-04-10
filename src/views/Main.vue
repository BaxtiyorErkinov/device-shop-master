<script setup lang="ts">
import { ITableHeader } from '@/components/ui/DataTable/DataTable.types';
import ServerDataTableWrapper from '@/components/workspace/ServerDataTableWrapper.vue';
import ProductsRepository from '@/repositories/modules/products.repository';
import { Edit, Search } from '@element-plus/icons-vue';
import { categories } from '@/constants/products';
import ProductsForm from '@/components/workspace/ProductsForm.vue';
import AuthCache from '@/cache/auth.cache';
import { useRouter } from 'vue-router';

const headers = [
  { title: 'Модель', key: 'model' },
  { title: 'Цена', key: 'price', type: 'formatted_number' },
  { title: 'Категория', key: 'category' },
  { title: 'Дата создания', key: 'createdAt', type: 'date' },
] as ITableHeader[];

const router = useRouter();
const dataTableRef = ref(null);

const filters = reactive({
  model_like: null,
  category: null,
});

function reloadData() {
  dataTableRef.value?.loadItems();
}

function logout() {
  AuthCache.clear();
  router.push({
    name: 'Login',
  });
}
</script>

<template>
  <div class="products__page">
    <el-page-header
      :title="'Выйти'"
      :icon="null"
      class="products__page__header"
      @back="logout"
    >
      <template #content>
        <div class="products__page__header__profile">
          <el-avatar
            :size="32"
            class="mr-3"
            src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          >
          </el-avatar>
          <h5>Пользователь</h5>
        </div>
      </template>
      <template #extra>
        <div class="flex items-center">
          <products-form type="create" @success="reloadData">
            <template #activator="{ activator }">
              <el-button type="primary" size="large" @click="activator">
                Создать
              </el-button>
            </template>
          </products-form>
        </div>
      </template>
    </el-page-header>

    <server-data-table-wrapper
      :headers="headers"
      :api-provider="ProductsRepository"
      :external-filters="filters"
      class="products__table"
      ref="dataTableRef"
    >
      <template #filters>
        <el-input
          v-model="filters.model_like"
          style="width: 240px; margin-right: 5px"
          placeholder="Поиск..."
          :prefix-icon="Search"
        />

        <el-select
          v-model="filters.category"
          multiple
          placeholder="Категория"
          style="width: 240px"
        >
          <el-option
            v-for="item in categories"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </template>

      <template #item.model="{ item }">
        <div class="products__table__item">
          <el-image
            v-if="item?.images"
            :src="item?.images"
            lazy
            class="products__table__item__img"
            :alt="item.model"
          />
          <span class="products__table__item__model">{{ item.model }}</span>
        </div>
      </template>

      <template #item.category="{ item }">
        <el-tag
          v-for="category in item.category"
          :key="category"
          effect="light"
          round
        >
          {{ category }}
        </el-tag>
      </template>

      <template #actions="{ item }">
        <products-form :item="item" type="update" @success="reloadData">
          <template #activator="{ activator }">
            <el-button
              type="warning"
              :icon="Edit"
              circle
              size="large"
              @click="activator"
            />
          </template>
        </products-form>
      </template>
    </server-data-table-wrapper>
  </div>
</template>

<style>
.products__page {
}

.products__page__header {
}

.products__page__header__profile {
  display: flex;
  align-items: center;
  column-gap: 10px;
}

.products__page__header__profile h5 {
  font-weight: 500;
}

.products__table {
}

.products__table__item {
  display: flex;
  align-items: center;
  column-gap: 5px;
}

.products__table__item__model {
  font-size: 16px;
  font-weight: 400;
}

.products__table__item__img {
  width: 60px;
  height: 80px;
  object-fit: contain;
  object-position: center;
}
</style>
