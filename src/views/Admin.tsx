import { FunctionComponent, useEffect, useState } from "react";
import { geekModel } from "../models/geekModel";
import { IProduct, productModel } from "../models/productModel";
import { BarcodeModal } from "./BarcodeModal";
import { ProductModal } from "./ProductModal";
import { Products } from "./Products";

interface IProps {}

export const Admin: FunctionComponent<IProps> = () => {
  const [currentId, setCurrentId] = useState<string>("");
  const [barcode, setBarcode] = useState<string>("");

  return (
    <div>
      <Products
        mode={"admin"}
        topActions={
          <div>
            <button onClick={() => setCurrentId("new")}>Add product</button>
          </div>
        }
        actions={(p: IProduct, load: () => Promise<void>) => {
          return (
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <button
                style={{ marginLeft: 4 }}
                onClick={() => {
                  setCurrentId(p.id);
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
              <button
                onClick={() => {
                  setBarcode(p.barcode);
                }}
              >
                Barcode
              </button>
            </div>
          );
        }}
      />
      <ProductModal
        id={currentId === "new" ? null : currentId}
        isOpen={!!currentId}
        close={() => {
          setCurrentId(null);
        }}
      />

      <BarcodeModal
        barcode={barcode}
        isOpen={!!barcode}
        close={() => {
          setBarcode(null);
        }}
      />
    </div>
  );
};
