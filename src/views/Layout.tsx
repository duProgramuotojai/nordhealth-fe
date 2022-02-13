import React, { FunctionComponent } from "react";
import { Outlet, Link } from "react-router-dom";
import { NotificationView } from "../core/NotificationView";

interface IProps {}

export const Layout: FunctionComponent<IProps> = () => {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={{ width: 500 }}>
        <div className="header">
          <header>
            <nav>
              <Link to="/products">Products</Link>
            </nav>
          </header>

          <div>
            <Link to="/admin">Admin</Link>
          </div>
          <div>
            <Link to="/cart">Cart</Link>
          </div>
        </div>
        <Outlet />
      </div>
    </div>
  );
};
