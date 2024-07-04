import { Hono } from "hono";
import { cors } from "hono/cors";
import { userRouter } from "./routes/user";
import { itemRouter } from "./routes/items";

const app = new Hono();

app.use("/*", cors());

app.route("/api/v1/user", userRouter);
app.route("/api/v1/item", itemRouter);

export default app;
