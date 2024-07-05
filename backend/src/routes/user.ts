import { Hono } from "hono";
import { signInInput, signUpInput } from "@anshpatel2434/ecommerce";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign, verify } from "hono/jwt";

export const userRouter = new Hono<{
	Bindings: {
		DATABASE_URL: string;
		JWT_SECRET: string;
	};
	Variables: {
		userId: string;
	};
}>();

userRouter.post("/signup", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());
	const body = await c.req.json();
	const result = signUpInput.safeParse(body);

	if (result.success) {
		try {
			try {
				const user = await prisma.user.findUnique({
					where: {
						email: body.email,
					},
				});
				if (user) {
					return c.json({
						status: 403,
						message: "This email is already in use, please login",
					});
				}
			} catch (error) {}
			const user = await prisma.user.create({
				data: {
					name: body.name,
					email: body.email,
					password: body.password,
				},
			});
			const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
			return c.json({
				jwt: jwt,
			});
		} catch (error) {
			return c.json({
				error: error,
				message: "error while creating user",
			});
		}
	} else {
		return c.json({
			status: 406,
			message: result.error.issues[0].message,
		});
	}
});

userRouter.post("/signin", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	try {
		const body = await c.req.json();
		const result = signInInput.safeParse(body);

		if (!result.success) {
			return c.json({
				status: 406,
				message: result.error.issues[0].message,
			});
		}

		const user = await prisma.user.findUnique({
			where: {
				email: body.email,
			},
		});

		if (!user) {
			return c.json({
				status: 401,
				message: "Invalid email, please signUp if you haven't",
			});
		}

		if (!(body.password == user.password)) {
			return c.json({
				status: 401,
				message: "Invalid password",
			});
		}

		const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
		return c.json({
			name: user.name,
			jwt: jwt,
		});
	} catch (error) {
		return c.json({
			status: 500,
			message: "Internal server error",
			error: error,
		});
	}
});

userRouter.get("/getUser", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const authHeader = c.req.header("Authorization");
	if (!authHeader) {
		return c.json({
			message: null,
		});
	}
	const user = await verify(authHeader, c.env.JWT_SECRET);
	c.set("userId", "" + user.id);
	try {
		const res = await prisma.user.findUnique({
			where: {
				id: c.get("userId"),
			},
		});
		if (res) {
			const data = res;
			return c.json({
				name: data.name,
				email: data.email,
			});
		} else {
			return c.json({
				message: null,
			});
		}
	} catch (error) {
		c.json({
			message: null,
		});
	}
});

userRouter.post("/checkExist", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const body = await c.req.json();

	try {
		const user = await prisma.user.findUnique({
			where: {
				email: body.email,
			},
		});
		if (user) {
			const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
			return c.json({
				status: 403,
				jwt: jwt,
			});
		} else {
			return c.json({
				status: 404,
			});
		}
	} catch (error) {
		return c.json({
			status: 404,
		});
	}
});

userRouter.get("/getUser/:userId", async (c) => {
	const prisma = new PrismaClient({
		datasourceUrl: c.env?.DATABASE_URL,
	}).$extends(withAccelerate());

	const userId = c.req.param("userId");
	try {
		const res = await prisma.user.findUnique({
			where: {
				id: userId,
			},
		});
		if (res) {
			const data = res;
			return c.json({
				name: data.name,
				email: data.email,
			});
		} else {
			return c.json({
				message: null,
			});
		}
	} catch (error) {
		c.json({
			message: null,
		});
	}
});
