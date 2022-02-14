import { Model } from "../core/Model";
import { IProduct } from "./productModel";

export interface IGeek {
  id: string;
  name: string;
  description: string;
  shopping_cart: string[];
}

interface ICartListItem {
  product: IProduct;
  count: number;
}

export interface ICart {
  cartItems: ICartListItem[];
  total: number;
}

class GeekModel extends Model<IGeek> {
  public addProductToCart = (id: string, product: string) => {
    return this.post(`${id}/add-to-cart`, { product });
  };

  public removeProductFromCart = (id: string, product: string) => {
    return this.post(`${id}/remove-from-cart`, { product });
  };

  public cart = async (id: string) => {
    const itemsInCart = await this.get<IProduct[]>(`${id}/cart`);

    const total = itemsInCart
      .map((c) => c.price)
      .reduce((a, b) => parseFloat((a + b).toFixed(2)), 0);
    const cartItems = itemsInCart.reduce((list, product) => {
      const currentListItem = list.find((l) => l.product.id === product.id);
      if (currentListItem) {
        currentListItem.count++;
      } else {
        list.push({ count: 1, product });
      }
      return list;
    }, [] as ICartListItem[]);

    const cart: ICart = { cartItems, total };
    return cart;
  };
}

export const geekModel = new GeekModel({
  baseUrl: "http://127.0.0.1:8000/geeks",
});
