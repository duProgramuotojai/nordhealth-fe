import { FunctionComponent, ReactElement } from "react";
import { IProduct } from "../models/productModel";

interface IProps {
  product: IProduct;
  actions: ReactElement;
}

export const ProductCard: FunctionComponent<IProps> = ({
  product,
  actions,
}) => {
  return (
    <div key={product.id} className="product">
      <div>
        <div className="product-title">{product.title}</div>
        <div className="product-description">{product.description}</div>
      </div>
      <div>
        <div className="product-price">{`${product.price} EUR`}</div>
        {actions}
      </div>
    </div>
  );
};
