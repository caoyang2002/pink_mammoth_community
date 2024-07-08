'use client'
import {
  Aptos,
  AptosConfig,
  Network,
  APTOS_COIN,
  AccountAddressInput,
  InputViewFunctionData,
  GraphqlQuery,
  AccountAddress,
} from '@aptos-labs/ts-sdk'
import {
  InputTransactionData,
  useWallet,
} from '@aptos-labs/wallet-adapter-react'
import { AccountInfo } from '@aptos-labs/wallet-adapter-core'
import { useState } from 'react'
import { Address } from 'cluster'
//------------------

// 实例化 aptos
const aptosConfig = new AptosConfig({ network: Network.TESTNET }) // 测试网
const aptos = new Aptos(aptosConfig) // 实例化

//
// -------------------------
// 模块地址
const moduleAddress = process.env.NEXT_PUBLIC_NFT_MODULE_ADDRESS
console.log('moduleAddress: ', moduleAddress)

// 获取 NFT
export default function MyNFTs() {
  // async function mint_nft() {
  console.log('开始获取 NFT')
  const [content, setContent] = useState('')
  const { account, signAndSubmitTransaction } = useWallet() // 确保这里正确导入了 useWallet

  const mint_nft = async () => {
    const fund = await aptos.getAccountInfo({
      accountAddress: `${process.env.NEXT_PUBLIC_NFT_MODULE_ADDRESS}`,
    })
    const modules = await aptos.getAccountTransactions({
      accountAddress: `${process.env.NEXT_PUBLIC_NFT_MODULE_ADDRESS}`,
    })
    // const tokens = await aptos.getAccountOwnedTokens({
    //   accountAddress: `${process.env.NEXT_PUBLIC_NFT_MODULE_ADDRESS}`,
    //

    // 打印日志
    console.log('moduleAddress: ', moduleAddress)
    console.log('fund: ', fund)
    console.log('modules: ', modules)
    // console.log('tokens: ', tokens)
    console.log('account: ', account)

    // 判断用户是否登陆，如果没有登陆后返回一个空的数组
    if (!account) return []

    // 一个交易的数据信息
    const transaction: InputTransactionData = {
      data: {
        // 方法的地址
        function: `${moduleAddress}::first_nft::mint`,
        // 方法的参数
        functionArguments: [content],
      },
    }
    try {
      const response = await signAndSubmitTransaction(transaction)
      await aptos.waitForTransaction({ transactionHash: response.hash })

      console.log(response)
    } catch (error: any) {
      console.log(error)
    }
  }
  const burn_nft = async (tokenId: string) => {
    const transaction: InputTransactionData = {
      data: {
        function: `${moduleAddress}::first_nft::burn`,
        functionArguments: [tokenId],
      },
    }
  }
  const query_nft = async () => {
    const tokens = await aptos.getAccountOwnedTokens({
      accountAddress: `${process.env.NEXT_PUBLIC_NFT_MODULE_ADDRESS}`,
    })
    console.log('tokens: ', tokens)
  }

  const coin = async () => {
    type Coin = { coin: { value: string } }
    if (process.env.NEXT_PUBLIC_NFT_MODULE_ADDRESS) {
      const resource = await aptos.getAccountResource<Coin>({
        accountAddress: account?.address as AccountAddressInput,
        resourceType: '0x1::coin::CoinStore<0x1::aptos_coin::AptosCoin>',
      })
      console.log('coin: ', resource.coin.value)
    }
  }

  const view_chain_id = async () => {
    const payload: InputViewFunctionData = {
      function: '0x1::chain_id::get',
    }
    const chainId = (await aptos.view({ payload }))[0]
    console.log('chainId: ', chainId)
  }

  // ----------------------------------------- 返回信息
  // 账本信息
  interface LedgerInfoResponse {
    ledger_infos: {
      chain_id: string
    }[]
  }

  // token 信息
  interface TokenInfoResponse {
    current_collection_ownership_v2_view: Array<CurrentCollectionOwnershipView>
  }

  interface CurrentCollectionOwnershipView {
    collection_id: string // collection id
    distinct_tokens: number // collection 中不同 token 的数量
    last_transaction_version: number // 最后交易版本
    owner_address: string // owner address
    current_collection: CurrentCollectionDetails // collection 详细信息
    __typename: 'current_collection_ownership_v2_view' // 类型名
  }

  interface CurrentCollectionDetails {
    collection_id: string // collection id
    collection_name: string // collection 名称
    creator_address: string // collection 创建者地址
    current_supply: number // collection 当前供应量
    description: string // collection 描述
    last_transaction_timestamp: string // 假设这是 ISO 格式的时间字符串
    last_transaction_version: number // 最后交易版本
    max_supply: number | null // max_supply 可能不存在，所以使用 number | null
    mutable_description: string | null
    mutable_uri: string | null
    table_handle_v1: string | null
    token_standard: 'v2' // 假设 token_standard 只有 "v2" 这一种情况
    total_minted_v2: number //
    uri: string // uri 地址
    __typename: 'current_collections_v2'
  }

  const query_syntax = `query GetAccountNftCollections($address: String) {
  current_collection_ownership_v2_view(
    where: {owner_address: {_eq: $address}}
    limit: 1000000
    offset: 0
    order_by: [{last_transaction_version: desc}, {collection_id: asc}]
  ) {
    collection_id
    distinct_tokens
    last_transaction_version
    owner_address
    current_collection {
      collection_id
      collection_name
      creator_address
      current_supply
      description
      last_transaction_timestamp
      last_transaction_version
      max_supply
      mutable_description
      mutable_uri
      table_handle_v1
      token_standard
      total_minted_v2
      uri
      __typename
    }
    __typename
  }
}`
  // 构建 variables 对象，直接使用变量而不是字符串模板
  const variables_obj = {
    address: account?.address, // 这里直接使用变量而不是字符串形式
  }
  const ntf_collection_info = aptos.queryIndexer<TokenInfoResponse>({
    query: {
      query: query_syntax,
      variables: variables_obj,
    },
  })
  // .then((response) => {
  //   console.log('查询结果:', response.ledger_infos) // 打印查询结果
  // })
  // .catch((error) => {
  //   console.error('查询失败:', error) // 捕获并打印查询过程中的错误
  // })

  const handleQueryClick = () => {
    console.log('按钮被点击，开始查询')
    console.log('地址: ', account?.address)
    console.log(
      ntf_collection_info
        .then((response) => {
          console.log(
            '查询结果:',
            response.current_collection_ownership_v2_view
          ) // 打印查询结果
        })
        .catch((error) => {
          console.error('查询失败:', error) // 捕获并打印查询过程中的错误
        })
    )
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <h1 className="text-4xl font-bold mb-4">NFT 市场</h1>
      <button onClick={mint_nft}>获取 NFT</button>
      <button onClick={query_nft}>查询 NFT</button>
      <button onClick={() => burn_nft('tokenid')}>销毁 NFT</button>
      <button onClick={coin}>查询 coin</button>
      <button onClick={view_chain_id}>查询 chain_id</button>
      <button onClick={handleQueryClick}>查询 ntf_collection_info</button>
      <p className="text-lg mb-8">This is the my NFTs page</p>
    </div>
  )
}
