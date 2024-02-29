import { SignJWT, jwtVerify } from "jose";
import { getEnv } from "./helpers";

export const signJWT = async (payload: { sub: string; role: string }) => {
  try {
    const secret = new TextEncoder().encode(getEnv("JWT_SECRET_KEY"));
    const alg = "HS256";
    return new SignJWT(payload)
      .setProtectedHeader({ alg })
      .setExpirationTime(`${getEnv("JWT_EXPIRES_IN_HOUR")}h`)
      .setSubject(payload.sub)
      .setIssuedAt()
      .sign(secret);
  } catch (error) {
    throw error;
  }
};

export const verifyJWT = async <T>(token: string): Promise<T> => {
  try {
    return (
      await jwtVerify(token, new TextEncoder().encode(getEnv("JWT_SECRET_KEY")))
    ).payload as T;
  } catch (error) {
    console.log(error);
    throw new Error("Your token has expired.");
  }
};
