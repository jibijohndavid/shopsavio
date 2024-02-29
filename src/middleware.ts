import { NextRequest, NextResponse } from "next/server";
import { apiErrorResponse, getEnv } from "./lib/helpers";
import { verifyJWT } from "./lib/token";

interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
  };
}

export async function middleware(req: NextRequest) {
  let token = "";
  if (req.headers.get("Authorization")?.startsWith("Bearer ")) {
    token = req.headers.get("Authorization")?.substring(7) ?? "";
  }

  const response = NextResponse.next();

  try {
    if (req.nextUrl.pathname.startsWith("/api/auth/register")) {
      return response;
    }

    if (req.nextUrl.pathname.startsWith("/api")) {
      await verifyJWT<{ sub: string }>(token);
    }

    // (req as AuthenticatedRequest).user = { id: sub };
  } catch (error) {
    return apiErrorResponse(401, "Token is invalid or expired!");
  }

  return response;
}

export const config = {
  matcher: ["/((?!api/auth/login|_next/static|_next/image|favicon.ico).*)"],
};
