import { Hono } from "hono";
import { cors } from "hono/cors";
import { userRouter } from "./routes/user";
import { itemRouter } from "./routes/items";
import { profileRouter } from "./routes/profile";

const app = new Hono();

app.use("/*", cors());
app.route("/api/v1/user", userRouter);
app.route("/api/v1/item", itemRouter);
app.route("/api/v1/profile", profileRouter);

export default app;
