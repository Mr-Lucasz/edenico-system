import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/contact
 * Formulário "Precisa de Ajuda?" - RF04 validação é feita no cliente.
 * Backend: integrar com serviço de e-mail ou CRM conforme definição.
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, subject, message } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios.' },
        { status: 400 }
      )
    }

    // TODO: enviar e-mail ou persistir (ex: Supabase, SendGrid, etc.)
    // await sendContactEmail({ name, email, subject, message })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch {
    return NextResponse.json(
      { error: 'Erro ao processar mensagem.' },
      { status: 500 }
    )
  }
}
