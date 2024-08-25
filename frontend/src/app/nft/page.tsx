'use client'
import Developing from '@/src/components/Developing'
// import MyNFTs from '@/src/components/nft/MyNFTs'
import MintNFT from '@/src/components/nft/MintNFT'
import QueryCollections from '@/src/components/nft/QueryCollections'
import QueryTokens from '@/src/components/nft/QueryTokens'
import BurnNFT from '@/src/components/nft/BurnNFT'
import AptosLogo from '@/src/static/AptosLogo'
import Typewriter from '@/src/components/effector/TypeWrite'
// import { Popover } from '@headlessui/react'
import Popover from '@/src/components/ui/Popover'
import { useState } from 'react'
import CustomContent from '@/src/components/nft/CustomContent'
import MatrixRain from '@/src/components/effector/MatrixRain'
import Photobox from '@/src/components/ui/InfiniteSliding'
import ImageList from '@/src/static/images/ImageList'
export default function NFT() {
  // 处理关闭弹窗的函数
  const handleClosePopover = () => {
    console.log('点击关闭弹窗会执行这里的代码')
  }
  return (
    <>
      <div className="pt-16 flex flex-col items-center justify-center gap-10">
        <ImageList />
        <Photobox />
        <Typewriter originalText="欢迎来到 NFT 世界" destination="/" />
        {/* <AptosLogo /> */}
        <CustomContent />
        <MintNFT />
        <Popover
          level="info"
          content="你好，这里是 NFT！你想拥有独一无二的资产吗？"
          onClose={handleClosePopover}
          // autoClose={true} // 设置为 true 表示自动关闭
          closeDelay={5000} // 设置为 5 秒后自动关闭
        />
        {/* <Popover /> */}
        {/* <QueryCollections /> */}
        <QueryTokens />
        {/* <MyNFTs /> */}
        {/* <MatrixRain /> */}
        <BurnNFT />
        {/* <Developing /> */}
        {/* <p>nft page</p> */}
      </div>
    </>
  )
}
