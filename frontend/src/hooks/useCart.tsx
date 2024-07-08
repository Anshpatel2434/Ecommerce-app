import { useEffect, useState } from "react";
import axios from "axios";
import { itemType } from "./useItems";

export type orderDetailsType = {
  orderDate: Date;
  orderStatus: string;
  orderContent: string;
  orderPrice: number;
};

export const useCart = () => {
  const [cartItems, setCartItems] = useState<itemType[]>([]);
  const [orderDetails, setOrderDetails] = useState<orderDetailsType>({
    orderDate: new Date(),
    orderStatus: "Delivering",
    orderContent: "",
    orderPrice: 0,
  });

  const BACKEND_URL = import.meta.env.VITE_DATABASE_URL;

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/cart/myCart`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setCartItems(response.data.cart.items);
        getOrderDetails(response.data.cart.items);
      });
  }, []);

  function getOrderDetails(items: itemType[]) {
    let content = "";
    let price = 0;
    items.map((item) => {
      content += `${item.itemQuantity} X ${item.itemName} \n`;
      price += item.itemPrice * item.itemQuantity;
    });
    setOrderDetails({
      ...orderDetails,
      orderContent: content,
      orderPrice: price,
    });
  }

  return {
    cartItems,
    setCartItems,
    orderDetails,
    setOrderDetails,
  };
};
