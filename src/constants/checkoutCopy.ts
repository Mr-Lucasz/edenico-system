/**
 * Copy do checkout — apenas compra de planos (não inclui fluxo de doação).
 */
export function getCheckoutCopy() {
  return {
    step1Title: 'Dados do Cliente',
    step2Title: 'Informações de Pagamento',
    step3Title: 'Confirmação',
    successTitle: 'Plano Adquirido com Sucesso!',
    successSubtitle:
      'Obrigado por seu apoio! Você receberá um email de confirmação em breve.',
    backToHome: 'Voltar ao início',
    progressTitle: 'Progresso',
    labels: {
      step1: 'Dados do Cliente',
      step2: 'Informações de Pagamento',
      step3: 'Confirmação',
      step4: 'Finalização',
    },
    form: {
      fullName: 'Nome Completo',
      fullNamePh: 'Seu nome completo',
      email: 'E-mail',
      emailPh: 'seu@email.com',
      phone: 'Telefone',
      phonePh: '(11) 99999-9999',
      cardNumber: 'Número do Cartão',
      cardNumberPh: '1234 5678 9012 3456',
      expiry: 'Data de Validade',
      expiryPh: 'MM/AA',
      cvv: 'CVV',
      cvvPh: '123',
      nameOnCard: 'Nome no Cartão',
      nameOnCardPh: 'Nome como aparece no cartão',
    },
    actions: {
      cancel: 'Cancelar',
      back: 'Voltar',
      continue: 'Continuar',
      finalize: 'Finalizar',
    },
    summary: {
      title: 'Resumo',
      lines: [
        { key: 'Plano:', value: 'Premium' },
        { key: 'Ciclo:', value: 'Mensal' },
        { key: 'Valor:', value: 'R$ 59,90/mês' },
      ],
    },
  }
}

export type CheckoutCopy = ReturnType<typeof getCheckoutCopy>
