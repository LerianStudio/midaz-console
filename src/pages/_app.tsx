import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div data-testid="app-react">
      <Component {...pageProps} />
      <ToastContainer />
    </div>
  )
}

export default MyApp
