import '@/styles/globals.css'
import NavbarComponenet from './navbar'

export default function App({ Component, pageProps }) {
  return(
    <div>
      <NavbarComponenet/>
       <Component {...pageProps} />
       
    </div>
  )
}
