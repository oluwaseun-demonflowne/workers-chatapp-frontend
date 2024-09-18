import { type payloadType } from "@/middleware";
import { jwtVerify, type JWTVerifyResult } from "jose";
import { cookies } from "next/headers";

export async function getSession() {
  const session = cookies().get("chat-auth")?.value;
  if (!session) return null;
  // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
  return await VerifyToken(session);
}
export async function VerifyToken(value: string) {
  try {
    const payload: JWTVerifyResult<payloadType> = await jwtVerify(
      value,
      new TextEncoder().encode(process.env.ACCESS_TOKEN)
    );
    if (payload.payload.email)
      return payload.payload.email as unknown as string;
  } catch (error) {
    // return redirect("/login");
  }
}
