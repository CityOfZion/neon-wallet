import { Clickable, TCustomClickableProps } from './Clickable'

type TProps = TCustomClickableProps & { clickableProps?: React.ComponentProps<'div'> } & React.ComponentProps<'button'>

export const Button = ({
  clickableProps,
  label,
  variant,
  leftIconFilled,
  rightIcon,
  rightIconFilled,
  leftIcon,
  flat,
  loading,
  colorSchema,
  ...props
}: TProps) => {
  return (
    <button {...props}>
      <Clickable
        {...clickableProps}
        label={label}
        variant={variant}
        leftIcon={leftIcon}
        leftIconFilled={leftIconFilled}
        rightIcon={rightIcon}
        rightIconFilled={rightIconFilled}
        flat={flat}
        loading={loading}
        disabled={props.disabled}
        colorSchema={colorSchema}
      />
    </button>
  )
}
