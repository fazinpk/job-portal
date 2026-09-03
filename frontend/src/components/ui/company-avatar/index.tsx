import { colorForCompany } from './consts'
import type { CompanyAvatarProps } from './types'

export function CompanyAvatar({ name, logoUrl, size = 28 }: CompanyAvatarProps) {
  if (logoUrl) {
    return (
      <img
        src={logoUrl}
        alt=""
        className="inline-block shrink-0 rounded-full object-cover"
        style={{ width: size, height: size }}
      />
    )
  }

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
