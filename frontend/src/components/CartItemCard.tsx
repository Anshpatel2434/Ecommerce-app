import { itemInputType } from "@anshpatel2434/ecommerce";
import { Card } from "@nextui-org/card";
import React from "react";

interface cartItemCardProps {
	item: itemInputType;
}

const CartItemCard: React.FC<cartItemCardProps> = ({ item }) => {
	return <Card></Card>;
};

export default CartItemCard;
