import { MdChevronRight } from 'react-icons/md'
import { TbLinkOff } from 'react-icons/tb'
import dappFallbackIcon from '@renderer/assets/images/dapp-fallback-icon.png'
import { IconButton } from '@renderer/components/IconButton'
import { ImageWithFallback } from '@renderer/components/ImageWithFallback'

type TProps = {
  name: string
  icon: string
  onDisconnect?(): void
}

export const DappConnectionListItem = ({ name, icon, onDisconnect }: TProps) => {
  return (
    <li className="flex justify-between py-2 items-center">
      <div className="flex items-center gap-2.5">
        <ImageWithFallback
          src={icon}
          alt={`${name} icon`}
          fallbackSrc={dappFallbackIcon}
          className="h-6 w-6  object-contain rounded-full bg-gray-300/30"
        />

        <p className="text-sm text-white">{name}</p>
      </div>

      <div className="flex gap-1">
        <IconButton icon={<TbLinkOff className="text-pink" />} size="md" compacted onClick={onDisconnect} />
        <IconButton icon={<MdChevronRight />} size="md" compacted disabled />
      </div>
    </li>
  )
}
