import nodemailer from "nodemailer";
import type Mail from "nodemailer/lib/mailer";

export const POST = async (req: Request, _res: Response) => {
  const { senderEmail, email } = await req.json();

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
    subject: "ChatterBox - Come Online",
    text: `${senderEmail} has asked you to come online <br></br> <a href="https://workers-chatapp-frontend.vercel.app/login">Click here to login</a>`
  };

  try {
    await transport.sendMail(mailOptions);
    return new Response(JSON.stringify("success"), {
      status: 200
    });
  } catch (error) {
    return new Response(JSON.stringify("error"), {
      status: 500
    });
  }
};
