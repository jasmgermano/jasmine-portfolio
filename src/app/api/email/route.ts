import { NextResponse, NextRequest } from "next/server";
import nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';

export async function POST(request: NextRequest) {
    const { email, name, message } = await request.json();
  
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MY_EMAIL,
        pass: process.env.MY_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
  
    const mailOptions: Mail.Options = {
      from: process.env.MY_EMAIL,
      to: process.env.MY_EMAIL,
      subject: 'Contato do Portfólio',
      text: `Nome: ${name}\nEmail: ${email}\nMensagem: ${message}`,
    };
  
    const sendMailPromisse = () => 
      new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
            reject(error);
          } else {
            resolve(info);
          }
        });
      });
  
    try {
      await sendMailPromisse();
      return NextResponse.json({ message: 'Mensagem enviada' });
    } catch (error) {
      return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
    }
  }