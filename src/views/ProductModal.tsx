import { FunctionComponent, useEffect, useState } from "react";
import { IProduct, productModel } from "../models/productModel";
import Modal from "react-modal";

interface IProps {
  id?: string;
  isOpen: boolean;
  close: () => void;
}

export const ProductModal: FunctionComponent<IProps> = ({
  isOpen,
  close,
  id,
}) => {
  const [product, setProduct] = useState<IProduct>(null);

  useEffect(() => {
    isOpen && load();
  }, [isOpen]);

  const load = async () => {
    if (!id) return;
    const prod = await productModel.load(id);

    setProduct(prod);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        close();
      }}
      style={{
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      }}
      contentLabel="Example Modal"
    >
      <h3>Product</h3>

      <form>
        <div className="form-field">
          <label htmlFor="title">title</label>
          <input
            id="title"
            name="title"
            value={product?.title}
            onChange={(e) => {
              setProduct({ ...product, title: e.target.value });
            }}
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">description</label>
          <input
            id="description"
            name="description"
            value={product?.description}
            onChange={(e) => {
              setProduct({ ...product, description: e.target.value });
            }}
          />
        </div>
        <div className="form-field">
          <label htmlFor="price">price</label>
          <input
            id="price"
            name="price"
            value={product?.price}
            type="number"
            step="any"
            onChange={(e) => {
              setProduct({ ...product, price: parseFloat(e.target.value) });
            }}
          />
        </div>

        <div
          style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}
        >
          <button
            onClick={async () => {
              if (id) {
                await productModel.update(product);
              } else {
                await productModel.create(product);
              }
              close();
            }}
          >
            {id ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </Modal>
  );
};
