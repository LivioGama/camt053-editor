export const format = (
  value?: number | null,
  currency?: string | null,
  isMobile: boolean = false,
  notation?: 'standard' | 'compact' | 'scientific' | 'engineering',
) => {
  const options = Object.assign(
    {},
    {
      notation: notation || (isMobile ? 'compact' : 'standard'),
    },
    currency && {
      currency,
      style: 'currency',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    },
  ) as Intl.NumberFormatOptions
  return Intl.NumberFormat(
    typeof window !== 'undefined' ? window.navigator.language : 'en',
    options,
  ).format(value || 0)
}
