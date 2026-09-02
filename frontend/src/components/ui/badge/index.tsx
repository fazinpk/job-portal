import { badgeVariants } from './consts'
import type { BadgeProps } from './types'

export function Badge({ theme, className, ...props }: BadgeProps) {
  return <span className={badgeVariants({ theme, className })} {...props} />
}
