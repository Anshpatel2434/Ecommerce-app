import { Hono } from "hono";
import { itemInput } from "@anshpatel2434/ecommerce";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from "hono/jwt";

export const profileRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

profileRouter.get("/getProfile", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const authHeader = c.req.header("Authorization");
		if (!authHeader) {
			c.status(403);
			return c.json({
				message: "You are not logged in",
			});
		}
		const user = await verify(authHeader, c.env.JWT_SECRET);

		const profile = await prisma.profile.findUnique({
			where: {
				userId: user.id + "",
			},
		});
		c.status(200);
		return c.json({
			profile: profile,
		});
	} catch (e) {
		c.status(411);
		return c.json({
			message: e,
		});
	}
});

profileRouter.post("/createProfile", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
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
		const body = await c.req.json();

		const profile = await prisma.profile.create({
			data: {
				userId: user.id + "",
				city: body.city,
				state: body.state,
				country: body.country,
				pincode: body.pincode,
				address: body.address,
				phone: body.phone,
			},
		});

		c.status(200);
		return c.json({
			message: "Profile successfully created",
		});
	} catch (e) {
		c.status(411);
		return c.json({
			message: e,
		});
	}
});

profileRouter.put("/updateProfile", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
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
		const body = await c.req.json();

		const profile = await prisma.profile.update({
			where: {
				userId: user.id + "",
			},
			data: {
				city: body.city,
				state: body.state,
				country: body.country,
				pincode: body.pincode,
				address: body.address,
				phone: body.phone,
			},
		});

		await prisma.user.update({
			where: {
				id: user.id + "",
			},
			data: {
				name: body.name,
			},
		});

		c.status(200);
		return c.json({
			message: "Profile successfully created",
		});
	} catch (e) {
		c.status(411);
		return c.json({
			message: e,
		});
	}
});

profileRouter.get("/getProfile/:userId", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const userId = c.req.param("userId");

		const res = await prisma.profile.findUnique({
			where: {
				userId: userId,
			},
			select: {
				city: true,
				state: true,
				country: true,
				pincode: true,
				address: true,
				phone: true,
			},
		});
		return c.json({
			profile: res,
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
