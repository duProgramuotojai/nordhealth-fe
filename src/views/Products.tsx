import { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { NotificationView } from "../core/NotificationView";
import { useSearch } from "../core/useSearch";
import { geekModel } from "../models/geekModel";
import { IProduct, productModel } from "../models/productModel";
import { ProductModal } from "./ProductModal";

interface IProps {
  mode?: "geek" | "admin";
  actions?: (
    product: IProduct,
    load?: () => Promise<void>,
    showNotification?: (text: string) => void
  ) => ReactElement;
  topActions?: ReactElement;
}

export const Products: FunctionComponent<IProps> = ({
  mode,
  actions,
  topActions,
}) => {
  const [filter, setFilter] = useState<string>("");
  const [notification, setNotification] = useState<string>("");

  const { items: products, load } = useSearch(productModel, filter);

  const showNotification = (text: string) => {
    setNotification(text);
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  const [modalIsOpen, setIsOpen] = useState<string>(null);

  const closeModal = () => {
    setIsOpen(null);
  };

  return (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ marginBottom: 16 }}>
          <input
            type="search"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          />
        </div>
        {topActions}
      </div>

      <div className="products">
        {products?.map((p) => {
          return (
            <div key={p.id} className="product">
              <div>
                <div className="product-title">{p.title}</div>
                <div className="product-description">{p.description}</div>
              </div>

              <div className="product-price">{`${p.price} EUR`}</div>
              {actions?.(p, load, showNotification)}
            </div>
          );
        })}
        {mode === "admin" && (
          <ProductModal
            id={modalIsOpen}
            isOpen={modalIsOpen != null}
            close={closeModal}
          />
        )}
        <NotificationView>
          {notification && (
            <div
              style={{
                width: 200,
                backgroundColor: "greenyellow",
                padding: 32,
              }}
            >
              {notification}
            </div>
          )}
        </NotificationView>
      </div>
    </>
  );
};

Products.defaultProps = {
  mode: "geek",
  actions: (p: IProduct, load, showNotification: (text: string) => void) => {
    return (
      <button
        onClick={async () => {
          await geekModel.addProductToCart("1", p.id);
          showNotification(`Added ${p.title}!!!`);
        }}
      >
        Add to cart
      </button>
    );
  },
};
