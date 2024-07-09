'use client'
import React, { useState, useEffect } from 'react'
import {
  InputTransactionData,
  useWallet,
} from '@aptos-labs/wallet-adapter-react'
import {
  Aptos,
  AptosConfig,
  InputViewFunctionData,
  Network,
} from '@aptos-labs/ts-sdk'

//查询 token 地址

// 实例化 Aptos
const aptosConfig = new AptosConfig({ network: Network.TESTNET })
const aptos = new Aptos(aptosConfig)

export default function CustomContent() {
  const [tokenAddr, setTokenAddr] = useState('')
  const { account, signAndSubmitTransaction } = useWallet()
  const [content, setContent] = useState('')

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
      const payload: InputViewFunctionData = {
        function: `${process.env.NEXT_PUBLIC_NFT_MODULE_ADDRESS}::first_nft::get_content`,
        functionArguments: [tokenAddr],
      }

      setContent((await aptos.view({ payload }))[0] as string)
      console.log('content: ', content)
    } catch (error) {
      console.error('Error view function:', error)
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
    <div className="flex flex-col items-center justify-center w-full mt-0 pt-0 mb-0 pb-0">
      <input
        type="text"
        value={tokenAddr} // 将输入框的值绑定到 content 状态
        onChange={handleInputChange} // 当输入框值变化时调用 handleInputChange
        placeholder="Enter Token Address"
      />
      <button onClick={burn_nft}>Custom Content</button>
      <p>{content}</p>
      {/* 其他 UI 元素 */}
    </div>
  )
}
