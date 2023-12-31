"use client";

import { PrivateComponentWrapper } from "@/components/PrivateComponentWrapper";
import Navbar from "@/container/Navbar/Navbar";
import { ShoppingItem } from "@/container/ShoopingItem/ShoppingItem";
import { CartApiService } from "@/helper/CartApiService";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useUserCart } from "@/hooks/useUserCart";
import { useEffect, useMemo, useState } from "react";
import { Product } from "shared";
import "./ShopPage.scss";

const ShopPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const cart = useUserCart();
  const token = useAppSelector((state) =>
    state.User.user.isLoggedIn ? state.User.user.token : null
  );

  const cartApiService = useMemo(() => {
    if (!token) throw new Error("can't initiate a cart service without token");
    return CartApiService.create(token);
  }, [token]);

  useEffect(() => {
    if (cart.loadedFromServer || cart.loading) return;
    cart.initializeOrders();
  }, [cart]);

  useEffect(() => {
    cartApiService
      .getAllShoppingProduct()
      .then((products) => setProducts(products));
  }, [cartApiService]);

  const onBuyHandler = (product: Product) => {
    cart.insert(product, 1);
  };

  return (
    <>
      <Navbar />
      <main className="shopping-items-container">
        {products?.map((product) => (
          <ShoppingItem
            key={product.id}
            product={product}
            isAdded={
              cart.orders.find((item) => item.product.id === product.id) != null
            }
            onBuy={() => onBuyHandler(product)}
          />
        ))}
      </main>
    </>
  );
};

export default function ShopPrivatePage() {
  return (
    <PrivateComponentWrapper redirectTo={"/account/login"}>
      <ShopPage />
    </PrivateComponentWrapper>
  );
}
