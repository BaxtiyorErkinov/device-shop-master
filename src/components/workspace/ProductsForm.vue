<script setup lang="ts">
import { IProduct } from '@/@types/product.types';
import ProductsRepository from '@/repositories/modules/products.repository';
import { useForm } from 'vee-validate';
import * as yup from 'yup';
import { toTypedSchema } from '@vee-validate/yup';
import { pick } from '@/utils/helpers';
import { categories } from '@/constants/products';
import ImageUploader from './ImageUploader.vue';
import { ElMessage } from 'element-plus';

interface IProps {
  type: 'create' | 'update';
  item?: IProduct;
}

const emit = defineEmits(['success']);
const props = withDefaults(defineProps<IProps>(), {
  type: 'create',
});

const request = {
  create: ProductsRepository.create?.bind(ProductsRepository),
  update: async (payload: IProduct) =>
    await ProductsRepository.update(props.item?.id, payload),
};

const isActive = ref(false);

function activate() {
  isActive.value = true;
}

const predefinedData = ref(props.item ?? {});
const schema = toTypedSchema(
  yup.object({
    model: yup.string().required().label('Model'),
    releaseDate: yup.string().required().label('Release Date'),
    category: yup.array().required().label('Category'),
    price: yup.number().required().label('Price'),
    is_visible: yup.boolean().label('Visibility'),
    description: yup.string().required().label('Description'),
  }),
);

const { defineField, handleSubmit, resetForm, errors } = useForm({
  validationSchema: schema,
  initialValues: {
    ...pick(props.item as IProduct, [
      'category',
      'description',
      'is_visible',
      'images',
      'model',
      'price',
      'releaseDate',
    ]),
  },
});

const elPlusConfig = state => ({
  props: {
    validateEvent: false,
    error: state.errors[0],
    required: state.required,
  },
});

const [model, modelProps] = defineField('model', elPlusConfig);
const [description, descriptionProps] = defineField(
  'description',
  elPlusConfig,
);
const [category, categoryProps] = defineField('category', elPlusConfig);
const [is_visible, isVisibleProps] = defineField('is_visible', elPlusConfig);
const [price, priceProps] = defineField('price', elPlusConfig);
const [releaseDate, releaseDateProps] = defineField(
  'releaseDate',
  elPlusConfig,
);

const onSubmit = handleSubmit(values => {
  let payload: Partial<IProduct> = {
    ...values,
    images: predefinedData.value.images ?? null,
  };

  if (props.type === 'create') {
    payload = {
      ...payload,
      createdAt: new Date(),
      id: Math.floor(Math.random() * 10000),
    };
  }

  request[props.type](payload).then(() => {
    ElMessage({
      type: 'success',
      message: `Запрос успешно обработан
 `,
    });
    emit('success');
    isActive.value = false;
  });
});
</script>

<template>
  <slot name="activator" :activator="activate"></slot>

  <el-dialog
    v-model="isActive"
    title="Shipping address"
    width="700"
    :z-index="1000"
  >
    <el-form @submit="onSubmit">
      <el-form-item v-bind="modelProps" label="Модель">
        <el-input placeholder="Название модели" v-model="model" />
      </el-form-item>

      <el-form-item v-bind="descriptionProps" label="Описание">
        <el-input
          placeholder="Описание"
          v-model="description"
          type="textarea"
        />
      </el-form-item>

      <el-form-item v-bind="releaseDateProps" label="Год релиза">
        <el-date-picker
          v-model="releaseDate"
          type="year"
          placeholder="Выберите год"
        />
      </el-form-item>

      <el-form-item v-bind="priceProps" label="Цена">
        <el-input
          v-model="price"
          :formatter="
            value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
          "
          :parser="value => Number(value.replace(/\$\s?|(,*)/g, ''))"
        />
      </el-form-item>

      <el-form-item v-bind="categoryProps" label="Категория">
        <el-select
          v-model="category"
          class="m-2"
          multiple
          placeholder="Выберите категорию"
        >
          <el-option
            v-for="item in categories"
            :key="item"
            :label="item"
            :value="item"
          />
        </el-select>
      </el-form-item>

      <el-form-item v-bind="isVisibleProps">
        <el-switch
          v-model="is_visible"
          active-text="Видимость для пользователя"
        >
        </el-switch>
      </el-form-item>
    </el-form>

    <image-uploader v-model="predefinedData.images" />

    <template #footer>
      <div class="dialog-footer">
        <el-button @click="isActive = false">отменить</el-button>
        <el-button type="primary" @click="onSubmit"> подтвердить </el-button>
      </div>
    </template>
  </el-dialog>
</template>
