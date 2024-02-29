import { apiErrorResponse } from "@/lib/helpers";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const allProducts = await prisma.product.findMany();

    return NextResponse.json({
      success: true,
      data: allProducts,
    });
  } catch (error: any) {
    return apiErrorResponse(500, error.message);
  }
}
