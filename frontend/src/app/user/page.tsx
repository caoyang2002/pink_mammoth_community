import { MyNFTs, NFTMinting, NFTDetails } from '@/src/components/NFT'
import Footer from '@/src/components/Footer'
import Header from '@/src/components/Header'
import ChyrawLogo from '@/src/static/ChyrawLogo'
import {
  Account,
  AccountAddress,
  Aptos,
  AptosConfig,
  Network,
} from '@aptos-labs/ts-sdk'
import { useState } from 'react'
import Pattner from '@/src/components/Pattner'

const config = new AptosConfig({ network: Network.TESTNET })
const aptos = new Aptos(config)

async function getAccount() {
  // 如果有 address
  if (AccountAddress) {
    const tokens = await aptos.getAccountOwnedTokens({
      accountAddress: `${AccountAddress.toString()}`,
    })
  }
}

async function getCoin() {
  type Coin = { coin: { value: string } }
  if (AccountAddress) {
    const resource = await aptos.getAccountResource<Coin>({
      accountAddress: `${AccountAddress}`,
      resourceType: '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>',
    })
    // Now you have access to the response type property
    const value = resource.coin.value
  }
}

export default function User() {
  // Setup the client

  const images = [
    'https://pbs.twimg.com/media/GEaqVEYaQAAnnQA?format=jpg&name=large',
    'https://i.seadn.io/gae/8TVeahpwphE8jh2UXqXB0UdS3RyKn6i7sB2zuQEManwJszjS8vnFeSxVa3S0R6GykzK--VhSLwqNMA77R2Ri_JXaaPkkXE8qpXk2?auto=format&dpr=1&w=1000',
    'https://i.pinimg.com/736x/cb/f6/8c/cbf68cc9a8235c9eed8e77e491735ae4.jpg',
  ]
  return (
    <>
      <Header />

      <div className="pt-16">
        <button onClick={getCoin}></button>

        <MyNFTs />
        <NFTMinting />
        <NFTDetails />
        <Pattner />
        <Footer />
      </div>
    </>
  )
}
