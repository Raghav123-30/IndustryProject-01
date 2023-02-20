import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from './navbar'
import Home from './home'
const inter = Inter({ subsets: ['latin'] })

export default function HomeComponent() {
  return (
    <>
       <Home/>
    </>
  )
}
