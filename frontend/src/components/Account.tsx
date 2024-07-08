import AccountIcon from '../static/AccountIcon'
import CopyAddrIcon from '../static/actionIcon/CopyIcon'

export default function CopyAddress() {
  return (
    <>
      <div>
        <a
          href="/account"
          className="wallet-button flex flex-col items-center justify-center text-center mt-1 rounded border-t border-b border-l border-r"
        >
          <AccountIcon />
        </a>
      </div>
    </>
  )
}
