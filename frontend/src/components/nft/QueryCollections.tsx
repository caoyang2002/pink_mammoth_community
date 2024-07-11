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
  GetAccountOwnedTokensQueryResponse,
} from '@aptos-labs/ts-sdk'
import {
  InputTransactionData,
  useWallet,
} from '@aptos-labs/wallet-adapter-react'
// import { AccountInfo } from '@aptos-labs/wallet-adapter-core'
import { useEffect, useState } from 'react'
import { Address } from 'cluster'
// import testNFT from '../test-nft'
//------------------

// 实例化 aptos
const aptosConfig = new AptosConfig({ network: Network.TESTNET }) // 测试网
const aptos = new Aptos(aptosConfig) // 实例化

// -------------------------
// 模块地址
const moduleAddress = process.env.NEXT_PUBLIC_NFT_MODULE_ADDRESS
console.log('moduleAddress: ', moduleAddress)
// 获取 NFT
export default function QueryCollections() {
  console.log('开始获取 NFT')
  const { account } = useWallet() // 确保这里正确导入了 useWallet

  const [ntfCollectionInfo, setNtfCollectionInfo] = useState(Object)
  // ----------------------------------------- 返回信息
  // 账本信息
  interface LedgerInfoResponse {
    ledger_infos: {
      chain_id: string
    }[]
  }

  interface TokenInfoResponse {
    current_collection_ownership_v2_view: CurrentCollectionOwnershipView[]
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
  // const variables_obj = {
  //   address: account?.address, // 这里直接使用变量而不是字符串形式
  // }
  // console.log('variables_obj: ', variables_obj)
  // const ntf_collection_info = aptos.queryIndexer<TokenInfoResponse>({
  //   query: {
  //     query: query_syntax,
  //     variables: variables_obj,
  //   },
  // })

  const handleQueryClick = () => {
    console.log('按钮被点击，开始查询')
    console.log('地址: ', account?.address)
    console.log(formattedTokens)
  }
  // 在组件渲染后执行查询
  useEffect(() => {
    if (!account) return

    const fetchNFTs = async () => {
      const variablesObj = {
        address: account.address,
      }

      try {
        const response: TokenInfoResponse[] = await aptos.queryIndexer<
          TokenInfoResponse[]
        >({
          query: {
            query: query_syntax,
            variables: variablesObj,
          },
        })
        console.log('the response is ', response)
        setNtfCollectionInfo(response)
      } catch (error) {
        console.error('查询 NFT 时发生错误:', error)
      }
    }

    fetchNFTs()
  }, [account]) // 当 account 更改时重新执行

  // 格式化 tokens 用于显示
  const formattedTokens =
    ntfCollectionInfo.current_collection_ownership_v2_view?.map(
      (token: any) => {
        return {
          // tokenDataId: token.token_data_id,
          collectionId: token.current_collection.collection_id,
          collectionName: token.current_collection.collection_name,
          description: token.current_collection.description,
          currentSupply: token.current_collection.current_supply,
          uri: token.current_collection.uri,
        }
      }
    )

  return (
    <div className="flex flex-col items-center justify-center w-full h-screen">
      <button onClick={handleQueryClick}>查询 NFT</button>
      {formattedTokens && formattedTokens.length > 0 && (
        <div>
          <h2>查询结果：</h2>
          {formattedTokens.map((token: any, index: any) => (
            <div key={index}>
              {/* <p>Token Data ID: {token.tokenDataId}</p> */}
              <p>Collection ID: {token.collectionId}</p>
              <p>Collection Name: {token.collectionName}</p>
              <p>Description: {token.description}</p>
              <p>Current Supply: {token.currentSupply}</p>
              <p>URI: {token.uri}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
