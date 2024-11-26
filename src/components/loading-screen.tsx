import React from 'react'
import Lottie from 'lottie-react'
import midazLoading from '@/animations/midaz-loading.json'

type LoadingScreenProps = {
  onComplete?: () => void
}

const LoadingScreen = ({ onComplete }: LoadingScreenProps) => {
  return (
    <div className="relative flex h-screen w-screen items-center justify-center bg-loading-wallpaper bg-cover">
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>
      <div className="relative z-10 h-36 w-36">
        <Lottie
          animationData={midazLoading}
          loop={false}
          onComplete={onComplete}
        />
      </div>
    </div>
  )
}

export default LoadingScreen
