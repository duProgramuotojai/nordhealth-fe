import { Model } from "../core/Model";

export interface IProduct {
  id: string;
  title: string;
  description: string;
  barcode: string;
  price: number;
}

class ProductModel extends Model<IProduct> {
  public create = async (product: IProduct) => {
    return this.post("", { ...product, barcode: Math.random() * 1000 });
  };
  public update = async (product: IProduct) => {
    return this.patch(product.id, {
      title: product.title,
      description: product.description,
      barcode: product.barcode,
      price: product.price,
    });
  };
}

export const productModel = new ProductModel({
  baseUrl: "http://127.0.0.1:8000/products",
});
