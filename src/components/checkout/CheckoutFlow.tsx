'use client'

import { useMemo, useState } from 'react'
import { getCheckoutCopy } from '@src/constants/checkoutCopy'
import { CheckoutProgressSidebar } from './CheckoutProgressSidebar'
import { StepConfirmation } from './steps/StepConfirmation'
import { StepPayment } from './steps/StepPayment'
import { StepPersonalData } from './steps/StepPersonalData'
import { StepSuccess } from './steps/StepSuccess'
import layoutStyles from './CheckoutLayout.module.scss'

export function CheckoutFlow() {
  const copy = useMemo(() => getCheckoutCopy(), [])
  const [step, setStep] = useState(1)

  return (
    <div className={layoutStyles.grid}>
      <div className={layoutStyles.mainCol}>
        {step === 1 ? (
          <StepPersonalData copy={copy} onContinue={() => setStep(2)} />
        ) : null}
        {step === 2 ? (
          <StepPayment
            copy={copy}
            onBack={() => setStep(1)}
            onContinue={() => setStep(3)}
          />
        ) : null}
        {step === 3 ? (
          <StepConfirmation
            copy={copy}
            onBack={() => setStep(2)}
            onFinalize={() => setStep(4)}
          />
        ) : null}
        {step === 4 ? <StepSuccess copy={copy} /> : null}
      </div>
      <div className={layoutStyles.sidebarCol}>
        <CheckoutProgressSidebar copy={copy} currentStep={step} />
      </div>
    </div>
  )
}
