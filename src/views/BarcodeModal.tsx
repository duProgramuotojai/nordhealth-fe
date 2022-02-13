import { FunctionComponent, useEffect, useState } from "react";
import { IProduct, productModel } from "../models/productModel";
import Modal from "react-modal";
import JsBarcode from "jsbarcode";

interface IProps {
  barcode?: string;
  isOpen: boolean;
  close: () => void;
}

export const BarcodeModal: FunctionComponent<IProps> = ({
  isOpen,
  close,
  barcode,
}) => {
  useEffect(() => {
    if (barcode) {
      setTimeout(() => {
        JsBarcode("#product-barcode", barcode);
      }, 100);
    }
  }, [barcode]);

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
      <h3>Barcode</h3>

      <canvas id={"product-barcode"} />
    </Modal>
  );
};
