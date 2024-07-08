import { WalletSelector } from '@aptos-labs/wallet-adapter-ant-design'
import { Popover } from '@headlessui/react'
import AdjustmentsIcon from '../static/actionIcon/SettingIcon'
import LeftIcon from '../static/actionIcon/LeftIcon'
import CopyAddrIcon from '../static/actionIcon/CopyIcon'
import CopyAddress from './CopyAddress'
import Setting from './Setting'
import React, { useEffect, useState } from 'react'
// import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { SyntheticEvent } from 'react'
import Account from './Account'

function Wallet() {
  // const [isOpen, setIsOpen] = useState(false)
  // const handleDocumentClick = (event: Event) => {
  //   const target = event.target as Element // 类型断言

  //   // 检查点击事件的目标是否是弹出面板的按钮或面板本身
  //   if (
  //     !target.closest('.account-button') &&
  //     !target.closest('.popover-panel')
  //   ) {
  //     setIsOpen(false)
  //     console.log('关闭')
  //   }
  // }

  // useEffect(() => {
  //   if (open) {
  //     document.addEventListener('click', handleDocumentClick)
  //     console.log('打开')
  //   }

  //   return () => {
  //     document.removeEventListener('click', handleDocumentClick)
  //   }
  // }, [isOpen])

  return (
    <Popover className=" text-white">
      <Popover.Button as="a" className={`account-button`}>
        账户
      </Popover.Button>

      <Popover.Panel className="absolute z-10 flex flex-col">
        <div className="flex flex-col rounded bg-black p-1">
          <WalletSelector />
          <CopyAddress />
          <Account />
          <Setting />
        </div>

        {/* <img src="/solutions.jpg" alt="" /> */}
      </Popover.Panel>
    </Popover>

    // //------------------------------------
    // <Popover className="ml-4 flow-root text-white lg:relative lg:ml-8">
    //   {({ open }: { open: boolean }) => {
    //     useEffect(() => {
    //       console.log('Ef-open?', open)
    //       if (open) {
    //         document.addEventListener('click', handleDocumentClick)
    //         console.log(open)
    //       }

    //       return () => {
    //         document.removeEventListener('click', handleDocumentClick)
    //       }
    //     }, [isOpen])

    //     if (!open) console.log('open?', open)
    //     return (
    //       <>
    //         <Popover className="relative text-white">
    //           <Popover.Button as="a" className={`account-button`}>
    //             账户
    //           </Popover.Button>

    //           <Popover.Panel className="absolute z-10 flex flex-col">
    //             <div className="flex flex-col rounded bg-black p-1">
    //               <WalletSelector />
    //               <CopyAddress />
    //               <Setting />
    //             </div>

    //             {/* <img src="/solutions.jpg" alt="" /> */}
    //           </Popover.Panel>
    //         </Popover>
    //       </>
    //     )
    //   }}
    // </Popover>
  )
}
export default Wallet
