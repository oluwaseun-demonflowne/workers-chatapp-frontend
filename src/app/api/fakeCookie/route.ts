import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";

export const POST = async (req: Request, _res: Response) => {
  const { email } = await req.json();
  const accessToken = sign(
    {
      email: email
    },
    process.env.ACCESS_TOKEN!,
    {
      expiresIn: 172800
    }
  );

  cookies().set("chat-auth", accessToken, {
    // httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 172800,
    path: "/"
  });
  return new Response(JSON.stringify("SIX_DIGIT_OTP"), {
    status: 200
  });
};
