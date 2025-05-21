'use client'

import { useEffect } from 'react'
import Header from './components/Header'
import HomePage from './components/Home'
import Funciona from './components/Funciona'
import Banner from './components/Banner'
import Footer from './components/Footer'
import Sobre from './components/Sobre'
import Empresas from './components/Empresas'

export default function Home() {
  useEffect(() => {

  }, [])

  return (
    <main className="font-sans bg-green-50 text-green-900">
      <Header />
      <HomePage />
      <Funciona />
      <Sobre />
      <Empresas />
      <Banner />
      <Footer />
    </main>
  )
}
