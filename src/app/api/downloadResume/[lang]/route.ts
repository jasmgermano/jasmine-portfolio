import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(req: NextRequest) {
  try {
    const lang = req.nextUrl.pathname.split('/')[3];

    const filePath = path.resolve('.', 'public', `resume-${lang}.pdf`);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: `resume-${lang}.pdf não encontrado` }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    const response = new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume-${lang}.pdf`,
      },
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}
