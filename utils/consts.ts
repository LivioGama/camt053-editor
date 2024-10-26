export const isDev = process.env.NODE_ENV === 'development'

export const isPreview = process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
