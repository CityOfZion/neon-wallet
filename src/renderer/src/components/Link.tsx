import { Link as RRDLink, LinkProps as RRDLinkProps } from 'react-router-dom'

import { Clickable, TCustomClickableProps } from './Clickable'

type TProps = { clickableProps?: React.ComponentProps<'div'> } & TCustomClickableProps & RRDLinkProps

export const Link = ({ clickableProps, label, variant, leftIcon, iconFilled, flat, ...props }: TProps) => {
  return (
    <RRDLink {...props}>
      <Clickable
        {...clickableProps}
        label={label}
        variant={variant}
        iconFilled={iconFilled}
        flat={flat}
        leftIcon={leftIcon}
        disabled={props.disabled}
      />
    </RRDLink>
  )
}
