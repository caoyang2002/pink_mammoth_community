'use client'

import { useEffect, useCallback, useState } from 'react'
import { getAptosClient } from '@/src/utils/aptosClient'
import { useKeylessAccount } from '@/src/context/KeylessAccountContext'
import Header from './body/Header'
import Footer from './body/Footer'
import Main from './body/Main'

const aptosClient = getAptosClient()

export function Connected() {
  console.log('Connected')
  const { keylessAccount } = useKeylessAccount()
  console.log('keylessAccount: ', keylessAccount ? '' : '没有获取到账户')

  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [progress, setProgress] = useState<number>(0)

  const fetch = useCallback(async () => {
    if (!keylessAccount?.accountAddress) {
      console.log(
        '账户地址是:',
        keylessAccount?.accountAddress
          ? keylessAccount.accountAddress
          : '没有账户地址'
      )
      setIsLoading(true) // 如果没有账户地址，停止加载状态,并返回一个页面
      // const hasPet = await aptosClient.view({
      //   payload: {
      //     function: `${NEXT_PUBLIC_CONTRACT_ADDRESS}::main::has_aptogotchi`,
      //     functionArguments: [keylessAccount.accountAddress],
      //   },
      // });
      return
    }
    setIsLoading(false) // 正在加载
    try {
      console.log('加载中')
    } catch (error) {
      // 处理错误
      console.error(error)
    } finally {
      setIsLoading(false) // 加载结束
      console.log('加载结束')
    }
  }, [keylessAccount, setIsLoading])

  // useEffect钩子的目的是在组件挂载后执行一次数据获取操作，
  useEffect(() => {
    fetch()
    if (!keylessAccount?.accountAddress) return // 如果 accountAddress 不存在或为空，函数将直接返回，不执行后续代码。
    console.log('useEffect - address: ', keylessAccount.accountAddress)
  }, [keylessAccount?.accountAddress]) // ，当keylessAccount对象的accountAddress属性发生变化时，重新执行useEffect钩子内的代码。如果依赖数组为空[]，则表示这个useEffect只在组件挂载时执行一次。

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((currentProgress) => {
        if (currentProgress >= 100) {
          clearInterval(interval)
          return 100
        }
        return currentProgress + 1
      })
    }, 25)

    return () => clearInterval(interval)
  }, [])

  // console.log('现在应该可以看到加载的内容了吧。。。')
  return (
    <>
      <Header />
      <div className="flex flex-col gap-3 p-3 justify-center items-center">
        {isLoading ? (
          <div className="nes-container with-title">
            <p className="title">Loading...</p>
            <progress
              className="nes-progress is-primary"
              value={progress}
              max="100"
            ></progress>
          </div>
        ) : (
          <div className="nes-container with-title">
            <p className="title">Connected</p>
            <p className="title">{keylessAccount?.accountAddress.toString()}</p>
          </div>
        )}
      </div>
      {/* <Main /> */}
      <Footer />
    </>
  )
}
