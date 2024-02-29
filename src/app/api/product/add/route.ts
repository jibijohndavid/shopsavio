import { apiErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { AddProductInput, AddProductSchema } from "./AddProductSchema";
import { customAlphabet } from "nanoid/async";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as AddProductInput;
    const data = AddProductSchema.parse(body);
    const generateCode = customAlphabet("1234567890ABCDEFG", 6);

    await prisma.product.create({
      data: {
        ...data,
        code: await generateCode(),
      },
    });

    return NextResponse.json({
      success: true,
      message: `Product created successfully`,
    });
  } catch (error: any) {
    console.log(error);

    if (error instanceof ZodError) {
      return apiErrorResponse(400, "Failed validations", error);
    }

    if (error.code === "P2002") {
      return apiErrorResponse(409, "Product with code already exists");
    }

    return apiErrorResponse(500, error.message);
  }
}
