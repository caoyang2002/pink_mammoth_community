import Developing from '@/src/components/Developing'
import MyNFTs from '@/src/components/nft/MyNFTs'
export default function NFT() {
  return (
    <>
      <div className="pt-16">
        <MyNFTs />
        <Developing />
        {/* <p>nft page</p> */}
      </div>
    </>
  )
}
