import {Provider} from '@/components/ui/provider'
import './globals.css'

export default ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => (
  <html lang='en' suppressHydrationWarning={true}>
    <body>
      <Provider>{children}</Provider>
    </body>
  </html>
)
