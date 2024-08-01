import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.nextUrl);
    const locale = searchParams.get('locale') || 'en-US';

    const filePath = path.resolve('.', 'public', `resume-${locale}.pdf`);

    // Verificar se o arquivo existe
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ message: 'Arquivo não encontrado' }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);

    const response = new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume-${locale}.pdf`,
      },
    });

    return response;
  } catch (error) {
    return NextResponse.json({ message: 'Erro interno do servidor' }, { status: 500 });
  }
}
