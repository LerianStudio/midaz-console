import Image from 'next/image'

import GeometricShape from '../../../../../public/images/geometric-shape.svg'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card/card'
import LoginView from '@/components/view/LoginView'

const SignInPage = () => {
  return (
    <div className="flex h-screen w-screen flex-col bg-[#faf9f9]">
      {/* <div className="mt-6 flex w-full justify-center">
        <Image src={LeriandLogo} alt="Leriand Logo" />
      </div> */}

      <div className="absolute flex h-screen w-full items-center justify-center">
        <div className="w-full">
          <Image src={GeometricShape} alt="Rectangle" />
        </div>

        <div className="absolute">
          <Card className="min-h-[505px] w-full min-w-[430px] border-none px-8 shadow-none">
            <CardHeader className="px-0 pt-[72px]">
              <CardTitle className="text-3xl font-semibold">
                Bem-vindo(a) de volta!
              </CardTitle>
              <CardDescription className="text-black">
                Insira seu e-mail e senha pra entrar.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <LoginView />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default SignInPage
