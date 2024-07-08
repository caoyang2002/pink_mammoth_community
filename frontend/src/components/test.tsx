import { Popover } from '@headlessui/react'

function MyPopover() {
  return (
    <Popover className="text-white relative">
      <Popover.Button>测试</Popover.Button>

      <Popover.Panel className="absolute z-10 flex flex-col">
        <div className="flex flex-col">
          <a href="/user" className="mb-4">
            User
          </a>
          <a href="/nft" className="mb-4">
            NFT
          </a>
          <a href="/learning" className="mb-4">
            Learning
          </a>
          <a href="/about" className="mb-4">
            About
          </a>
        </div>

        <img src="/solutions.jpg" alt="" />
      </Popover.Panel>
    </Popover>
  )
}
export default MyPopover
