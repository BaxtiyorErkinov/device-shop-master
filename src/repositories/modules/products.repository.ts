import { IProduct } from '@/@types/product.types';
import { IRepository } from '../Repository';
import axiosInstance from '@/plugins/axios';
import { ICrudTemplateMethods } from '@/@types/repository.types';

const ProductsRepository: Partial<ICrudTemplateMethods> & IRepository = {
  resource: 'products',

  async getAll(query: any) {
    return await axiosInstance.get<IProduct[]>(`/${this.resource}`, {
      params: query,
    });
  },

  async create(payload: IProduct) {
    return await axiosInstance.post<IProduct>(`/${this.resource}`, payload);
  },

  async update(productId: number, payload: IProduct) {
    return await axiosInstance.patch<IProduct>(
      `/${this.resource}/${productId}`,
      payload,
    );
  },

  async delete(id: number) {
    return await axiosInstance.delete<IProduct>(`/${this.resource}/${id}`);
  },
} as const;

export default ProductsRepository;
