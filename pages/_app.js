import '@/styles/globals.css'

import NavbarComponenet from './navbar'
import { createTheme, NextUIProvider } from "@nextui-org/react"

export default function App({ Component, pageProps }) {
  const darkTheme = createTheme({
    type: 'dark',
    
  })
  return(
    
    <NextUIProvider >
      <NavbarComponenet/>
       <Component {...pageProps} />
       
    </NextUIProvider>
   
  )
}
