import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

export const cartRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

cartRouter.use("/*", async (c, next) => {
	try {
		// Authorization header check
		const authHeader = c.req.header("Authorization");
		if (!authHeader) {
			c.status(403);
			return c.json({
				message: "You are not logged in",
			});
		}

		// Verify JWT token
		const user = await verify(authHeader, c.env.JWT_SECRET);
		c.set("userId", "" + user.id);
		await next();
	} catch (error) {
		return c.json({
			message: "error in authorization",
			error: error,
		});
	}
});

cartRouter.post("/addToCart", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const data = await c.req.json();
		// Retrieve existing cart for the user
		const existingCart = await prisma.cart.findUnique({
			where: {
				userId: c.get("userId"),
			},
		});

		if (!existingCart) {
			// If cart does not exist, create a new one
			const newCart = await prisma.cart.create({
				data: {
					userId: c.get("userId"),
					items: {
						connect: [
							{
								userId: data.userId,
								id: data.id,
								category: data.category,
								itemName: data.itemName,
								itemPrice: data.itemPrice,
								itemQuantity: data.itemQuantity,
								itemDescription: data.itemDescription,
								itemImage: data.itemImage || null,
							},
						],
					},
				},
			});
			c.status(200);
			return c.json({
				message: "Item added to cart",
				added: newCart,
			});
		} else {
			// If cart exists, update it by appending new item
			const updatedCart = await prisma.cart.update({
				where: {
					userId: c.get("userId"),
				},
				data: {
					items: {
						connect: [
							{
								userId: data.userId,
								id: data.id,
								category: data.category,
								itemName: data.itemName,
								itemPrice: data.itemPrice,
								itemQuantity: data.itemQuantity,
								itemDescription: data.itemDescription,
								itemImage: data.itemImage || null,
							},
						],
					},
				},
			});
			c.status(200);
			return c.json({
				message: "Item added to cart",
				added: updatedCart,
			});
		}
	} catch (error) {
		return c.json({
			message: "error in add to cart",
			error: error,
		});
	}
});

cartRouter.get("/myCart", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const cart = await prisma.cart.findUnique({
			where: {
				userId: c.get("userId"),
			},
			include: {
				items: true, // Include the related items in the result
			},
		});

		if (cart) {
			return c.json({
				cart: cart,
			});
		} else {
			c.status(404);
			return c.json({
				message: "Cart not found, Please add items to your cart",
			});
		}
	} catch (error) {
		return c.json({ error: "An error occurred while fetching the cart" }, 500);
	}
});
