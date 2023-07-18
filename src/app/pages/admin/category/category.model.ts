import { ProductModel } from "../product/product.model";

export class CategoryModel {
  _id: string | null;
  name: string | null;
  image: string | null;
  createdAt?: string;
  updatedAt?: string;
  productAmount?: number;
  products?: ProductModel[];

  constructor(
    _id: string,
    name: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    productAmount: number,
    products: ProductModel[],
  ) {
    this._id= _id;
    this.name= name;
    this.image=image;
    this.createdAt= createdAt;
    this.updatedAt= updatedAt;
    this.productAmount=productAmount;
    this.products=products
  }

}
