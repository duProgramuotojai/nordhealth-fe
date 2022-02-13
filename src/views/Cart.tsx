import { FunctionComponent, useEffect, useState } from "react";
import { geekModel, ICart } from "../models/geekModel";
import { IProduct } from "../models/productModel";

interface IProps {}

export const Cart: FunctionComponent<IProps> = () => {
  const [cart, setCart] = useState<ICart>(null);

  useEffect(() => {
    load();
  }, []);

  const load = async () => {
    const crt = await geekModel.cart("1");
    setCart(crt);
  };

  const add = async (id: string) => {
    await geekModel.addProductToCart("1", id);
    await load();
  };

  const remove = async (id: string) => {
    await geekModel.removeProductFromCart("1", id);
    await load();
  };

  if (!cart) {
    return null;
  }
  return (
    <div>
      {cart?.cartItems.map((c) => {
        return (
          <div
            key={c.product.id}
            style={{ display: "flex", justifyContent: "flex-start" }}
          >
            <div
              style={{ width: 100 }}
            >{`${c.product.title} x ${c.count}`}</div>
            <div style={{ width: 80 }}>{`${c.product.price} EUR`}</div>
            <div style={{ width: 80 }}>
              <button onClick={() => remove(c.product.id)}>-</button>
              <button onClick={() => add(c.product.id)}>+</button>
            </div>
          </div>
        );
      })}
      <hr />
      <div style={{ display: "flex", justifyContent: "flex-start" }}>
        <div style={{ width: 100 }}>Total</div>
        <div style={{ width: 80 }}>{`${cart.total} EUR`}</div>
      </div>
    </div>
  );
};
