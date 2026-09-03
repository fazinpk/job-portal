import { colorForCompany } from './consts'
import type { CompanyAvatarProps } from './types'

export function CompanyAvatar({ name, size = 28 }: CompanyAvatarProps) {
  const initial = name.trim().charAt(0).toUpperCase() || '?'

  return (
    <span
      aria-hidden="true"
      className={`inline-flex shrink-0 items-center justify-center rounded-full font-semibold ${colorForCompany(name)}`}
      style={{ width: size, height: size, fontSize: size * 0.45 }}
    >
      {initial}
    </span>
  )
}
