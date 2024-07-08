import CopyAddrIcon from '../static/actionIcon/CopyIcon'

export default function CopyAddress() {
  return (
    <>
      <div>
        <a
          href=""
          className="wallet-button flex flex-col items-center justify-center text-center mt-1 rounded border-t border-b border-l border-r"
        >
          <CopyAddrIcon />
        </a>
      </div>
    </>
  )
}
