// 'use client'
import {
  Aptos,
  AptosConfig,
  Network,
  APTOS_COIN,
  AccountAddressInput,
  InputViewFunctionData,
  GraphqlQuery,
  AccountAddress,
  GetAccountOwnedTokensQueryResponse,
} from '@aptos-labs/ts-sdk'
import { useWallet } from '@aptos-labs/wallet-adapter-react'

// 实例化 aptos
const aptosConfig = new AptosConfig({ network: Network.TESTNET }) // 测试网
const aptos = new Aptos(aptosConfig) // 实例化

// 假设 getTokens 是一个返回 Promise 的异步函数，它解决后返回 tokens 数组
async function getFormattedTokens() {
  const { account, signAndSubmitTransaction } = useWallet() // 确保这里正确导入了 useWallet
  try {
    // 等待异步获取 tokens 数组
    const tokens = await aptos.getAccountOwnedTokens({
      accountAddress: `${account?.address}`,
    })

    // 使用 map 函数处理 tokens 数组，同时检查避免访问 null 或 undefined 的属性
    const formattedTokens = tokens.map((token) => {
      // 检查 token.current_token_data 是否存在
      if (!token.current_token_data) {
        // 如果 token.current_token_data 是 null 或 undefined，可以返回 null 或一个默认对象
        return null
      }

      // 安全地访问嵌套属性，并返回新对象
      return {
        tokenDataId: token.token_data_id,
        collectionId: token.current_token_data.collection_id,
        collectionName: token.current_token_data.current_collection
          ? token.current_token_data.current_collection.collection_name
          : undefined, // 提供默认值或根据需要处理
        description: token.current_token_data.current_collection
          ? token.current_token_data.current_collection.description
          : undefined, // 提供默认值或根据需要处理
        currentSupply: token.current_token_data.current_collection
          ? token.current_token_data.current_collection.current_supply
          : undefined, // 提供默认值或根据需要处理
        uri: token.current_token_data.token_uri,
      }
    })

    // 过滤掉任何 null 值（如果在你的逻辑中需要的话）
    const filteredFormattedTokens = formattedTokens.filter(
      (token) => token !== null
    )

    // 返回或使用 filteredFormattedTokens
    return filteredFormattedTokens
  } catch (error) {
    // 处理异步操作中的错误
    console.error('获取格式化的 tokens 时出错:', error)
  }
}

// 调用异步函数
export default function TestNFT() {
  getFormattedTokens().then((formattedTokens) => {
    console.log(formattedTokens)
  })
}
