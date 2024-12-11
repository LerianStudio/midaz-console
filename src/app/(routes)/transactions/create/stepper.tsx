import { useIntl } from 'react-intl'
import {
  Stepper as PrimitiveStepper,
  StepperItem,
  StepperItemNumber,
  StepperItemText
} from '../primitives/stepper'

export const Stepper = () => {
  const intl = useIntl()

  return (
    <PrimitiveStepper>
      <StepperItem>
        <StepperItemNumber>1</StepperItemNumber>
        <StepperItemText>
          {intl.formatMessage({
            id: 'transactions.create.stepper.first',
            defaultMessage: 'Transaction Data'
          })}
        </StepperItemText>
      </StepperItem>
      <StepperItem>
        <StepperItemNumber>2</StepperItemNumber>
        <StepperItemText>
          {intl.formatMessage({
            id: 'transactions.create.stepper.second',
            defaultMessage: 'Operations and Metadata'
          })}
        </StepperItemText>
      </StepperItem>
      <StepperItem>
        <StepperItemNumber>3</StepperItemNumber>
        <StepperItemText>
          {intl.formatMessage({
            id: 'transactions.create.stepper.third',
            defaultMessage: 'Review'
          })}
        </StepperItemText>
      </StepperItem>
    </PrimitiveStepper>
  )
}
