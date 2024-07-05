import { Hono } from "hono";
import { itemInput } from "@anshpatel2434/ecommerce";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

export const itemRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

itemRouter.post("/addItem", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    // Authorization header check
    const authHeader = c.req.header("Authorization");
    if (!authHeader) {
      return c.json({
        message: "You are not logged in",
      });
    }

    // Verify JWT token
    const user = await verify(authHeader, c.env.JWT_SECRET);
    c.set("userId", "" + user.id);

    // Parse and validate the request body
    const body = await c.req.json();
    const result = itemInput.safeParse(body);

    if (!result.success) {
      return c.json({
        status: 406,
        message: result.error.issues[0].message,
      });
    }

    // Create the item in the database
    const item = await prisma.item.create({
      data: {
        userId: c.get("userId"),
        category: body.category,
        itemName: body.itemName,
        itemPrice: body.itemPrice,
        itemQuantity: body.itemQuantity,
        itemImage: body.itemImage || null,
        itemDescription: body.itemDescription,
      },
    });

    return c.json({
      message: "Item added successfully",
      item: item,
    });
  } catch (error) {
    console.error("Error occurred:", error);
    return c.json({
      status: 500,
      message: "Internal server error",
      error: error,
    });
  }
});

itemRouter.get("/allItems", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const items = await prisma.item.findMany({
      select: {
        id: true,
        userId: true,
        itemName: true,
        itemPrice: true,
        itemQuantity: true,
        category: true,
        itemImage: true,
      },
    });
    return c.json({
      items: items,
    });
  } catch (error) {
    return c.json({
      message: "error while fetching all items",
      error: error,
    });
  }
});
