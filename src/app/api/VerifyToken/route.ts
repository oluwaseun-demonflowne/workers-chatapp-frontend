import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import { jwtVerify } from "jose";

type payloadType = {
  OTP: number;
  iat: number;
  exp: number;
};

export const POST = async (req: Request, _res: Response) => {
  const { email } = await req.json();
  const accessToken = sign(
    {
      email: email
    },
    process.env.ACCESS_TOKEN!,
    {
      expiresIn: 24 * 60 * 60 * 1000
    }
  );
  const authHeader = req.headers;
  authHeader.get("otpToken");
  if (!authHeader)
    //  no header , i do not know how this is possible lol but just put there incase
    return new Response(JSON.stringify("No token sent"), {
      status: 401
    });

  //

  // const OTPs = authHeader.get("otpToken");

  const cookieStore = cookies();
  const token = cookieStore.get("OTP");
  if (!token) {
    // return no cookie set up please input your email again , maybe token expired
    return new Response(JSON.stringify("Oboy Error"), {
      status: 402
    });
  }
  const { value } = token!;
  try {
    const payload = await jwtVerify<payloadType>(
      value,
      new TextEncoder().encode(process.env.OTP_TOKEN)
    );
    if (
      payload.payload.OTP.toString() === authHeader.get("otpToken")?.toString()
    ) {
      cookies().set("chat-auth", accessToken, {
        // httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000,
        path: "/"
      });
      return new Response(JSON.stringify("SIX_DIGIT_OTP"), {
        status: 200
      });
    }
    //  return incorrect key
    return new Response(JSON.stringify("Incorrect Key"), {
      status: 401
    });
  } catch (error) {
    //  unknown error
    return new Response(JSON.stringify("Oboy Error again"), {
      status: 500
    });
  }
};
