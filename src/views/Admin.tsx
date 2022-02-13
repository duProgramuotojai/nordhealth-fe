import { FunctionComponent, useEffect, useState } from "react";
import { geekModel } from "../models/geekModel";
import { IProduct, productModel } from "../models/productModel";
import { ProductModal } from "./ProductModal";
import { Products } from "./Products";

interface IProps {}

export const Admin: FunctionComponent<IProps> = () => {
  const [currentId, setCurrentId] = useState<string>(null);

  const openModal = (id?: string) => {
    setCurrentId(id);
  };

  const closeModal = () => {
    setCurrentId(null);
  };

  return (
    <div>
      <Products
        mode={"admin"}
        topActions={
          <div>
            <button onClick={() => openModal("new")}>Add product</button>
          </div>
        }
        actions={(p: IProduct, load: () => Promise<void>) => {
          return (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                style={{ marginLeft: 4 }}
                onClick={() => {
                  openModal(p.id);
                }}
              >
                Edit
              </button>
              <button
                style={{ marginLeft: 4 }}
                onClick={async () => {
                  await productModel.delete(p.id);
                  await load();
                }}
              >
                Remove
              </button>
            </div>
          );
        }}
      />
      <ProductModal
        id={currentId === "new" ? null : currentId}
        isOpen={currentId != null}
        close={closeModal}
      />
    </div>
  );
};
