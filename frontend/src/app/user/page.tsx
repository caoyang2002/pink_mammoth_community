import { NFTMinting, NFTDetails } from '@/src/components/NFT'
import ChyrawLogo from '@/src/static/ChyrawLogo'
// import Card from '@/src/comp/Card'
import Pattner from '@/src/components/Pattner'
import { Account, Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk'
// import MyNfts from '@/src/components/nft/MyNFTs'
// import { useState } from 'react'
// import { useKeylessAccount } from '@/src/context/KeylessAccountContext'
// export const metadata = {
//   title: 'Pink Mammoth',
//   description: 'we are web3 community',
// }
const config = new AptosConfig({ network: Network.TESTNET })
const aptos = new Aptos(config)
// const { keylessAccount, setKeylessAccount } = useKeylessAccount()

// async function getAccount() {
//   // 如果有 address
//   if (keylessAccount) {
//     const tokens = await aptos.getAccountOwnedTokens({
//       accountAddress: `${keylessAccount.accountAddress.toString()}`,
//     })
//   }
// }

// async function getCoin() {
//   type Coin = { coin: { value: string } }
//   if (keylessAccount) {
//     const resource = await aptos.getAccountResource<Coin>({
//       accountAddress: `${keylessAccount}`,
//       resourceType: '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>',
//     })
//     // Now you have access to the response type property
//     const value = resource.coin.value
//   }
// }

export default function User() {
  // Setup the client

  const images = [
    'https://pbs.twimg.com/media/GEaqVEYaQAAnnQA?format=jpg&name=large',
    'https://i.seadn.io/gae/8TVeahpwphE8jh2UXqXB0UdS3RyKn6i7sB2zuQEManwJszjS8vnFeSxVa3S0R6GykzK--VhSLwqNMA77R2Ri_JXaaPkkXE8qpXk2?auto=format&dpr=1&w=1000',
    'https://i.pinimg.com/736x/cb/f6/8c/cbf68cc9a8235c9eed8e77e491735ae4.jpg',
  ]
  return (
    <>
      {/* <Header /> */}

      <div className="pt-16">
        {/* <button onClick={getCoin}></button> */}
        {/* <MyNFTs /> */}
        <NFTMinting />
        <NFTDetails />
        <Pattner />
        {/* <Footer /> */}
      </div>
    </>
  )
}
