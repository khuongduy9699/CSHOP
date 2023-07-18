export class CategoryDTO {
  _id: string | null;
  name: string | null;
  image: string | null;
  createdAt?: string;
  updatedAt?: string;

  constructor(
    _id: string,
    name: string,
    image: string,
    createdAt: string,
    updatedAt: string,
  ) {
    this._id= _id;
    this.name= name;
    this.image=image;
    this.createdAt= createdAt;
    this.updatedAt= updatedAt;
  }

}
