import { Link as RRDLink, LinkProps as RRDLinkProps } from 'react-router-dom'

import { Clickable, TCustomClickableProps } from './Clickable'

type TProps = { clickableProps?: React.ComponentProps<'div'> } & TCustomClickableProps & RRDLinkProps

export const Link = ({
  clickableProps,
  label,
  variant,
  leftIcon,
  leftIconFilled,
  rightIcon,
  rightIconFilled,
  flat,
  colorSchema,
  ...props
}: TProps) => {
  return (
    <RRDLink {...props}>
      <Clickable
        {...clickableProps}
        label={label}
        variant={variant}
        leftIconFilled={leftIconFilled}
        rightIcon={rightIcon}
        rightIconFilled={rightIconFilled}
        flat={flat}
        leftIcon={leftIcon}
        disabled={props.disabled}
        colorSchema={colorSchema}
      />
    </RRDLink>
  )
}
