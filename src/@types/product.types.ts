export interface IProduct {
  id: number;
  model: string;
  releaseDate: Date;
  category: string[];
  price: number;
  createdAt: Date;
  is_visible: boolean;
  images: string;
  description: string;
}
