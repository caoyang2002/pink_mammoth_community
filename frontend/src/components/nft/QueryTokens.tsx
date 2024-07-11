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
  GetCurrentTokenOwnershipResponse,
} from '@aptos-labs/ts-sdk'
import {
  InputTransactionData,
  useWallet,
} from '@aptos-labs/wallet-adapter-react'
// import { AccountInfo } from '@aptos-labs/wallet-adapter-core'
import { useEffect, useState } from 'react'
import { Address } from 'cluster'
// import CopyToClipboard from 'react-copy-to-clipboard'
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
export default function QueryTokens() {
  console.log('开始获取 NFT')

  const { account } = useWallet() // 确保这里正确导入了 useWallet

  const [tokenInfo, setTokenInfo] = useState(Object)
  // ----------------------------------------- 返回信息
  // 账本信息
  interface TokenInfoResponse {
    current_token_ownerships_v2: GetCurrentTokenOwnershipResponse[]
  }

  interface CurrentCollectionOwnershipView {
    current_token_data: CurrentTokenData
    owner_address: string
    amount: number
    __typename: 'current_token_ownerships_v2'
  }

  interface CurrentTokenData {
    collection_id: string
    largest_property_version_v1: number | null
    current_collection: CurrentCollectionDetails
    description: string
    token_name: string
    token_data_id: string
    token_standard: 'v1' | 'v2'
    token_uri: string
    __typename: 'current_token_datas_v2'
  }

  interface CurrentCollectionDetails {
    collection_id: string
    collection_name: string
    creator_address: string
    description: string
    uri: string
    max_supply: number | null
    __typename: 'current_collections_v2'
  }

  const query_syntax = `query GetAccountNfts($address: String) {
  current_token_ownerships_v2(
    where: {owner_address: {_eq: $address}, amount: {_gt: "0"}}
  ) {
    current_token_data {
      collection_id
      largest_property_version_v1
      current_collection {
        collection_id
        collection_name
        description
        creator_address
        uri
        __typename
      }
      description
      token_name
      token_data_id
      token_standard
      token_uri
      __typename
    }
    owner_address
    amount
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
    console.log('账户地址: ', account?.address)
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
        setTokenInfo(response)
      } catch (error) {
        console.error('查询 NFT 时发生错误:', error)
      }
    }

    fetchNFTs()
  }, [account]) // 当 account 更改时重新执行

  // 格式化 tokens 用于显示
  const formattedTokens = tokenInfo.current_token_ownerships_v2?.map(
    (token: any) => {
      // 检查 token.token_uri 是否存在，如果不存在则提供默认行为
      const tokenUri = token.current_token_data.token_uri || ''
      console.log('token uri is:', tokenUri)
      const fullIpfsUrl = tokenUri.startsWith('ipfs:/')
        ? `http://caoyang2002.top:8080/ipfs${tokenUri.split('ipfs:/')[1]}`
        : tokenUri // 如果没有 'ipfs/' 前缀，直接使用原始 URI
      console.log('the ipfs utl is :', fullIpfsUrl)
      return {
        // tokenDataId: token.token_data_id,
        collectionId: token.current_token_data.collection_id, // 使用 token_data_id 作为 Collection ID
        // collection 名字
        collectionName:
          token.current_token_data.current_collection.collection_name,
        creatorAddress:
          token.current_token_data.current_collection.creator_address,
        // token 描述
        description: token.current_token_data.current_collection.description,
        // 当前供应量
        // currentSupply:token.current_token_data.current_collection.current_supply,
        // token uri
        tokenUri: token.current_token_data.token_uri, // 使用 token_uri
        // token 名字
        tokenName: token.current_token_data.token_name, // 使用 token_name
        tokenDataId: token.current_token_data.token_data_id,

        tokenCurrentCollection: token.current_token_data.current_collection.uri,

        ownerAddress: token.owner_address, // 添加所有者地址
        amount: token.amount, // 添加数量
        // ...token,
        // 使用拼接后的链接作为图片的 src
        imageIpfsUrc: fullIpfsUrl,
        // 使用 token 的描述作为 alt 文本
        // imageAlt: token.description,
      }
    }
  )
  return (
    <div className="flex flex-col items-center justify-center w-full mt-0 pt-0 mb-0 pb-0">
      <button onClick={handleQueryClick}>查询 NFT</button>
      {formattedTokens && formattedTokens.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-4">查询结果：</h2>
          {formattedTokens.map((token: any, index: any) => (
            <div key={index} className="flex items-start justify-start mb-4">
              <div className="mr-4">
                <img
                  className="w-64 h-64 object-cover"
                  src={token.imageIpfsUrc}
                  alt={token.description || 'NFT Image'}
                />
              </div>
              <div className="text-left">
                <p className="mb-1">Collection ID: {token.collectionId}</p>
                <p className="mb-1">Collection Name: {token.collectionName}</p>
                <p className="mb-1">Token Description: {token.description}</p>
                <p className="mb-1">Token URI: {token.tokenUri}</p>
                <p className="mb-1">Token Name: {token.tokenName}</p>
                <p className="mb-1">Token Data ID: {token.tokenDataId}</p>
                <p className="mb-1">Owner Address: {token.ownerAddress}</p>
                <p className="mb-1">Amount: {token.amount}</p>
                <p className="mb-1">Creator Address: {token.creatorAddress}</p>
                {/* <div>
                  <p className="mb-1">
                    Owner Address: <span>{token.ownerAddress}</span>
                  </p>
                  <CopyToClipboard text={token.ownerAddress}>
                    <button>复制地址</button>
                  </CopyToClipboard>
                </div> */}
              </div>
              <div className="text-left flex flex-col mb-1">
                <a className="mb-4">联系</a>
                <a className="mb-4">喜欢</a>
                <a className="mb-4">收藏</a>
                <a className="mb-4">购买</a>
                <a className="mb-4">出售</a>
                <a className="mb-0">查看</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
