// 'use client'
// import {
//   Aptos,
//   AptosConfig,
//   Network,
//   APTOS_COIN,
//   AccountAddressInput,
//   InputViewFunctionData,
//   GraphqlQuery,
//   AccountAddress,
//   GetAccountOwnedTokensQueryResponse,
// } from '@aptos-labs/ts-sdk'
// import {
//   InputTransactionData,
//   useWallet,
// } from '@aptos-labs/wallet-adapter-react'
// import { AccountInfo } from '@aptos-labs/wallet-adapter-core'
// import { useEffect, useState } from 'react'
// import { Address } from 'cluster'
// // import testNFT from '../test-nft'
// //------------------

// // 实例化 aptos
// const aptosConfig = new AptosConfig({ network: Network.TESTNET }) // 测试网
// const aptos = new Aptos(aptosConfig) // 实例化

// //
// // -------------------------
// // 模块地址
// const moduleAddress = process.env.NEXT_PUBLIC_NFT_MODULE_ADDRESS
// console.log('moduleAddress: ', moduleAddress)

// // 获取 NFT
// export default async function MyNFTs() {
//   // async function mint_nft() {
//   console.log('开始获取 NFT')
//   const [content, setContent] = useState('')
//   const { account, signAndSubmitTransaction } = useWallet() // 确保这里正确导入了 useWallet

//   // 使用 useEffect 来处理异步逻辑
//   useEffect(() => {
//     // 这里可以放置你的异步操作
//   }, [])

//   const mint_nft = async () => {
//     // const fund = await aptos.getAccountInfo({
//     //   accountAddress: `${process.env.NEXT_PUBLIC_NFT_MODULE_ADDRESS}`,
//     // })
//     // const modules = await aptos.getAccountTransactions({
//     //   accountAddress: `${process.env.NEXT_PUBLIC_NFT_MODULE_ADDRESS}`,
//     // })
//     // const tokens = await aptos.getAccountOwnedTokens({
//     //   accountAddress: `${process.env.NEXT_PUBLIC_NFT_MODULE_ADDRESS}`,
//     //

//     // 打印日志
//     console.log('moduleAddress: ', moduleAddress)
//     // console.log('fund: ', fund)
//     // console.log('modules: ', modules)
//     // console.log('tokens: ', tokens)
//     console.log('account: ', account)

//     // 判断用户是否登陆，如果没有登陆后返回一个空的数组
//     if (!account) return []

//     // 一个交易的数据信息
//     const transaction: InputTransactionData = {
//       data: {
//         // 方法的地址
//         function: `${moduleAddress}::first_nft::mint`,
//         // 方法的参数
//         functionArguments: [content],
//       },
//     }
//     try {
//       const response = await signAndSubmitTransaction(transaction)
//       await aptos.waitForTransaction({ transactionHash: response.hash })

//       console.log(response)
//     } catch (error: any) {
//       console.log(error)
//     }
//   }

//   c

//   return (
//     <div className="flex flex-col items-center justify-center w-full h-screen">
//       <button onClick={mint_nft}>Mint NFT</button>
//     </div>
//   )
// }

// MyNFTs组件
'use client'
import React, { useState, useEffect } from 'react'
import {
  InputTransactionData,
  useWallet,
} from '@aptos-labs/wallet-adapter-react'
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk'
import { handleClientScriptLoad } from 'next/script'

// 其他必要的导入...

// 实例化 Aptos
const aptosConfig = new AptosConfig({ network: Network.TESTNET })
const aptos = new Aptos(aptosConfig)

export default function MintNFT() {
  const [content, setContent] = useState('')
  const { account, signAndSubmitTransaction } = useWallet()

  // 处理铸造 NFT 的异步逻辑
  useEffect(() => {
    if (!account) return // 如果没有账户，返回

    // 这里可以执行异步操作，例如获取账户信息或监听账户变化
    // 例如，获取账户信息的异步函数
    const fetchAccountInfo = async () => {
      const accountInfo = await aptos.getAccountInfo({
        accountAddress: account.address,
      })
      console.log('Account Info:', accountInfo)
    }

    fetchAccountInfo() // 调用异步函数
  }, [account]) // 当 account 发生变化时，重新执行

  // 输入
  useEffect(() => {
    // 当 tokenAddr 更新后，这个回调函数会被调用
    console.log('content has been updated to: ', content)
  }, [content]) // 依赖数组告诉 React 仅在 content 更改后运行此效果

  const mint_nft = async () => {
    if (!account) return // 如果没有账户，返回

    try {
      // 一个交易的数据信息
      const transaction: InputTransactionData = {
        data: {
          function: `${process.env.NEXT_PUBLIC_NFT_MODULE_ADDRESS}::first_nft::mint`,
          functionArguments: [content],
        },
      }

      // 提交交易并等待交易完成
      const response = await signAndSubmitTransaction(transaction)
      await aptos.waitForTransaction({ transactionHash: response.hash })
      console.log('Transaction response:', response)
    } catch (error) {
      console.error('Error minting NFT:', error)
    }
  }
  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    console.log('content: ', content)
    // 更新 content 状态为当前输入框的值
    setContent(event.target.value)
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <input
        type="text"
        value={content} // 将输入框的值绑定到 content 状态
        onChange={handleInputChange} // 当输入框值变化时调用 handleInputChange
        placeholder="Enter content for NFT"
      />
      <button onClick={mint_nft}>Mint NFT</button>
      {/* 其他 UI 元素 */}
    </div>
  )
}
