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
  ...props
}: TProps) => {
  return (
    <button {...props}>
      <Clickable
        {...clickableProps}
        label={label}
        variant={variant}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        flat={flat}
        loading={loading}
        disabled={props.disabled}
        colorSchema={colorSchema}
        iconsOnEdge={iconsOnEdge}
      />
    </button>
  )
}
