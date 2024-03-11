import Image from 'next/image'
import GeometricShape from '../../public/images/geometric-shape.svg'
import LeriandLogo from '../../public/images/leriand-logo.png'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { PasswordInput } from '@/components/ui/password-input'
import { Progress } from '@/components/ui/progress'
import React from 'react'
import { Label } from '@/components/ui/label'

const Page = () => {
  const [currentStep, setCurrentStep] = React.useState(1)
  const stepsTotal = 3
  const progressPerStep = 100 / 2

  const nextStep = () => {
    setCurrentStep((prevStep) =>
      prevStep < stepsTotal ? prevStep + 1 : prevStep
    )
  }

  const previousStep = () => {
    setCurrentStep((prevStep) => (prevStep > 1 ? prevStep - 1 : prevStep))
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 1:
        return (
          <div>
            <Label htmlFor="email">Email</Label>
            <Input type="email" id="email" placeholder="Email" />
            <Button onClick={nextStep} className="mt-4">
              Next
            </Button>
          </div>
        )
      case 2:
        return (
          <div>
            <Label htmlFor="password">Password</Label>
            <Input type="password" id="password" placeholder="Password" />
            <Button onClick={nextStep} className="mt-4">
              Next
            </Button>
            <Button onClick={previousStep} className="mt-2">
              Back
            </Button>
          </div>
        )
      case 3:
        return (
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              type="password"
              id="confirmPassword"
              placeholder="Confirm Password"
            />
            <Button onClick={previousStep} className="mt-2">
              Back
            </Button>
          </div>
        )
      default:
        return <div>Step not found</div>
    }
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-[#faf9f9]">
      <div className="mt-6 flex w-full flex-col items-center">
        <Image src={LeriandLogo} alt="Leriand Logo" />
        <div className="mt-6 flex w-full max-w-[429px] flex-col gap-2">
          <h1 className="text-center text-3xl font-semibold text-black">
            Crie sua conta
          </h1>
          <p className="text-center text-sm font-normal text-black">
            Step {currentStep} of {stepsTotal}
          </p>
          <Progress
            value={progressPerStep * currentStep}
            className="mt-5 w-full"
            indicatorColor="bg-[#F9DF4B]"
          />
        </div>
      </div>

      <div className="mt-3 flex w-full justify-center">
        <Card className="min-h-[407px] min-w-[429px] border-none py-6 shadow-none">
          <CardContent>
            <div className="flex flex-col gap-5">
              {renderStepContent(currentStep)}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Page
