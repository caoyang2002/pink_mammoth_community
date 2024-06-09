'use client'
import Footer from './body/Footer'
import Header from './body/Header'
import Main from './body/Main'
// import '@/src/app/styles/additional-styles/theme.css'

import React, { useState } from 'react'

export function NotConnected() {
  console.log('未连接')
  return (
    <>
      <Header />
      <Main />
      <Footer />
    </>
  )
}
