import Developing from '@/src/components/Developing'
// import MyNFTs from '@/src/components/nft/MyNFTs'
import MintNFT from '@/src/components/nft/MintNFT'
import QueryCollections from '@/src/components/nft/QueryCollections'
import QueryTokens from '@/src/components/nft/QueryTokens'
import BurnNFT from '@/src/components/nft/BurnNFT'
import AptosLogo from '@/src/static/AptosLogo'
export default function NFT() {
  return (
    <>
      <div className="pt-16 flex flex-col items-center justify-center gap-10">
        <AptosLogo />
        {/* <MintNFT /> */}
        {/* <QueryCollections /> */}
        <QueryTokens />
        {/* <MyNFTs /> */}
        <BurnNFT />
        <Developing />
        {/* <p>nft page</p> */}
      </div>
    </>
  )
}
