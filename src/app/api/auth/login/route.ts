import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { apiErrorResponse, getEnv } from "@/lib/helpers";
import { LoginUserInput, LoginUserSchema } from "./LoginUserSchema";
import { compare } from "bcryptjs";
import { signJWT } from "@/lib/token";
import { ZodError } from "zod";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as LoginUserInput;
    const data = LoginUserSchema.parse(body);

    const user = await prisma.user.findUnique({
      where: { email: data.email },
    });

    console.log(user);

    if (!user || !(await compare(data.password, user.password))) {
      return apiErrorResponse(401, "Invalid email or password");
    }

    const token = await signJWT({ sub: user.id, role: user.role });

    return NextResponse.json({
      success: true,
      message: "Successfully logged in",
      data: {
        email: user.email,
        role: user.role,
      },
      token,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return apiErrorResponse(400, "failed validations", error);
    }
    return apiErrorResponse(500, error.message);
  }
}
