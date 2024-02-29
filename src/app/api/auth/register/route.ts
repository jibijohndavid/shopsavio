import { apiErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { RegisterUserInput, RegisterUserSchema } from "./RegisterUserSchema";
import { hash } from "bcryptjs";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as RegisterUserInput;
    const data = RegisterUserSchema.parse(body);

    const hashedPassword = await hash(data.password, 12);

    await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message: `User created successfully`,
    });
  } catch (error: any) {
    if (error instanceof ZodError) {
      return apiErrorResponse(400, "Failed validations", error);
    }

    if (error.code === "P2002") {
      return apiErrorResponse(409, "User with email already exists");
    }

    return apiErrorResponse(500, error.message);
  }
}
