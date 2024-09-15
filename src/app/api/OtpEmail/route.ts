import { sign } from "jsonwebtoken";
import { cookies } from "next/headers";
import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";

export const POST = async (req: Request, _res: Response) => {
  const { email } = await req.json();

  const SIX_DIGIT_OTP = Math.floor(Math.random() * 1000000)
    .toString()
    .padStart(6, "0");

  console.log(SIX_DIGIT_OTP);

  const accessToken = sign(
    {
      OTP: SIX_DIGIT_OTP
    },
    process.env.OTP_TOKEN!,
    {
      expiresIn: "30s"
    }
  );

  cookies().set("OTP", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 30,
    path: "/"
  });

  const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.NODEMAILER_EMAIL,
      pass: process.env.NODEMAILER_PASSWORD
    }
  });

  const mailOptions: Mail.Options = {
    from: process.env.NODEMAILER_EMAIL,
    to: email,
    subject: "Verification code",
    text: SIX_DIGIT_OTP
  };

  try {
    await transport.sendMail(mailOptions);
    return new Response(JSON.stringify("success"), {
      status: 200
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify("error"), {
      status: 500
    });
  }
};
