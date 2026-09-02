import { forwardRef } from 'react'
import { iconButtonVariants } from './consts'
import type { IconButtonProps } from './types'

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon: Icon, label, size = 16, theme, className, type = 'button', ...props }, ref) => {
    return (
      <button
        ref={ref}
        type={type}
        aria-label={label}
        title={label}
        className={iconButtonVariants({ theme, className })}
        {...props}
      >
        <Icon size={size} />
      </button>
    )
  },
)

IconButton.displayName = 'IconButton'
