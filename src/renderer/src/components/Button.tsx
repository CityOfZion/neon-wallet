import { Clickable, TCustomClickableProps } from './Clickable'

type TProps = TCustomClickableProps & { clickableProps?: React.ComponentProps<'div'> } & React.ComponentProps<'button'>

export const Button = ({ clickableProps, label, variant, leftIcon, ...props }: TProps) => {
  return (
    <button {...props}>
      <Clickable {...clickableProps} label={label} variant={variant} leftIcon={leftIcon} disabled={props.disabled} />
    </button>
  )
}
