'use client'
// import '@/src/app/styles/additional-styles/theme.css'
import { useKeylessAccount } from '@/src/context/KeylessAccountContext'
import { Connected } from './Connected'
import { NotConnected } from './NotConnected'

export function Body() {
  const { keylessAccount } = useKeylessAccount()

  if (keylessAccount) return <Connected />

  return <NotConnected />
}
