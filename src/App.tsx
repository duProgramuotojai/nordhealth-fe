import "./App.css";

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import { Cart } from "./views/Cart";
import { Layout } from "./views/Layout";
import { Products } from "./views/Products";
import { Admin } from "./views/Admin";

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="products" element={<Products />} />
          <Route path="cart" element={<Cart />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
