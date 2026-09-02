import { forwardRef } from 'react'
import { buttonVariants } from './consts'
import type { ButtonProps } from './types'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ theme, className, ...props }, ref) => {
  
  return <button ref={ref} className={buttonVariants({ theme, className })} {...props} />
})

Button.displayName = 'Button'
