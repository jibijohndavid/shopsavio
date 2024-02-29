import { NextResponse } from "next/server";
import { ZodError } from "zod";

export function getEnv(key: string): string {
  const value = process.env[key];

  if (!value || value.length === 0) {
    console.error(`The environment variable ${key} is not set.`);
    throw new Error(`The environment variable ${key} is not set.`);
  }

  return value;
}

export function apiErrorResponse(
  status: number = 500,
  message: string,
  errors: ZodError | null = null
) {
  return new NextResponse(
    JSON.stringify({
      success: false,
      message,
      errors: errors ? errors.flatten() : null,
    }),
    {
      status,
      headers: { "Content-Type": "application/json" },
    }
  );
}
