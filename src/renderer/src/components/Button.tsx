import { Clickable, TCustomClickableProps } from './Clickable'

type TProps = TCustomClickableProps & { clickableProps?: React.ComponentProps<'div'> } & React.ComponentProps<'button'>

export const Button = ({
  clickableProps,
  label,
  variant,
  rightIcon,
  leftIcon,
  flat,
  loading,
  colorSchema,
  iconsOnEdge,
  disabled,
  ...props
}: TProps) => {
  const isDisabled = disabled || loading

  return (
    <button {...props} disabled={isDisabled}>
      <Clickable
        {...clickableProps}
        label={label}
        variant={variant}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        flat={flat}
        loading={loading}
        disabled={isDisabled}
        colorSchema={colorSchema}
        iconsOnEdge={iconsOnEdge}
      />
    </button>
  )
}
