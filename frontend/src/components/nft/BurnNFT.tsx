'use client'
import React, { useState, useEffect } from 'react'
import {
  InputTransactionData,
  useWallet,
} from '@aptos-labs/wallet-adapter-react'
import { Aptos, AptosConfig, Network } from '@aptos-labs/ts-sdk'

//查询 token 地址

// 实例化 Aptos
const aptosConfig = new AptosConfig({ network: Network.TESTNET })
const aptos = new Aptos(aptosConfig)

export default function BurnBFT() {
  const [tokenAddr, setTokenAddr] = useState('')
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

  const burn_nft = async () => {
    if (!account) return // 如果没有账户，返回

    try {
      // 一个交易的数据信息
      const transaction: InputTransactionData = {
        data: {
          function: `${process.env.NEXT_PUBLIC_NFT_MODULE_ADDRESS}::first_nft::burn`,
          functionArguments: [tokenAddr],
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
  // set token address
  const handleInputChange = (event: {
    target: { value: React.SetStateAction<string> }
  }) => {
    console.log('tokenAddr: ', tokenAddr)
    // 更新 tokenAddr 状态为当前输入框的值
    setTokenAddr(event.target.value)
  }
  // 输入
  useEffect(() => {
    // 当 tokenAddr 更新后，这个回调函数会被调用
    console.log('tokenAddr has been updated to: ', tokenAddr)
  }, [tokenAddr]) // 依赖数组告诉 React 仅在 tokenAddr 更改后运行此效果

  //
  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <input
        type="text"
        value={tokenAddr} // 将输入框的值绑定到 content 状态
        onChange={handleInputChange} // 当输入框值变化时调用 handleInputChange
        placeholder="Enter content for NFT"
      />
      <button onClick={burn_nft}>Burn NFT</button>
      {/* 其他 UI 元素 */}
    </div>
  )
}
