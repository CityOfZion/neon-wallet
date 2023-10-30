import { Clickable, TCustomClickableProps } from './Clickable'

type TProps = TCustomClickableProps & { clickableProps?: React.ComponentProps<'div'> } & React.ComponentProps<'button'>

export const Button = ({ clickableProps, label, variant, iconFilled, leftIcon, flat, ...props }: TProps) => {
  return (
    <button {...props}>
      <Clickable
        {...clickableProps}
        label={label}
        variant={variant}
        leftIcon={leftIcon}
        iconFilled={iconFilled}
        flat={flat}
        disabled={props.disabled}
      />
    </button>
  )
}
