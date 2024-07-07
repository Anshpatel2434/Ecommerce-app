import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

export const orderRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

orderRouter.use("/*", async (c, next) => {
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

orderRouter.post("/createOrder", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    // Parse and validate the request body
    const data = await c.req.json();

    // Create the order in the database
    const order = await prisma.order.create({
      data: {
        userId: c.get("userId"),
        orderStatus: data.orderDetails.orderStatus,
        orderContent: data.orderDetails.orderContent,
        orderPrice: Number(data.orderDetails.orderPrice),
      },
    });

    c.status(200);
    return c.json({
      message: "Order created successfully",
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

orderRouter.get("/getOrders", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    // Create the order in the database
    const orders = await prisma.order.findMany({
      where: {
        userId: c.get("userId"),
      },
    });

    //update orderstatur from shipping to delivered if date now is 5 days later to order date

    c.status(200);
    return c.json({
      message: "Order created successfully",
      orders: orders,
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
