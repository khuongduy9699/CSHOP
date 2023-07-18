export class ProductModel {
  _id: string | null;
  name: string | null;
  image: string | null;
  price: number | null;
  description: string | null;
  categoryId: string | null;
  categoryName?: string | null;
  createdAt?: string;
  updatedAt?: string;

  constructor(
    _id: string,
    name: string,
    image: string,
    price: number,
    description: string,
    categoryId: string,
    categoryName: string,
    createdAt: string,
    updatedAt: string,
  ) {
    this._id= _id;
    this.name= name;
    this.image=image;
    this.price= price;
    this.description=description;
    this.categoryId=categoryId;
    this.categoryName=categoryName;
    this.createdAt= createdAt;
    this.updatedAt= updatedAt;
  }

}
