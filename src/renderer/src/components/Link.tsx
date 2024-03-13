import { Link as RRDLink, LinkProps as RRDLinkProps } from 'react-router-dom'
import { StyleHelper } from '@renderer/helpers/StyleHelper'

import { Clickable, TCustomClickableProps } from './Clickable'

type TProps = { clickableProps?: React.ComponentProps<'div'> } & TCustomClickableProps & RRDLinkProps

export const Link = ({
  clickableProps,
  label,
  variant,
  leftIcon,
  rightIcon,
  flat,
  colorSchema,
  iconsOnEdge,
  className,
  disabled,
  onClick,
  ...props
}: TProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (disabled) {
      e.preventDefault()
    }

    onClick?.(e)
  }

  return (
    <RRDLink className={StyleHelper.mergeStyles('cursor-default', className)} onClick={handleClick} {...props}>
      <Clickable
        {...clickableProps}
        label={label}
        variant={variant}
        rightIcon={rightIcon}
        flat={flat}
        leftIcon={leftIcon}
        disabled={disabled}
        colorSchema={colorSchema}
        iconsOnEdge={iconsOnEdge}
      />
    </RRDLink>
  )
}
