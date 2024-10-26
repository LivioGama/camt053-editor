import {Provider} from '@/components/ui/provider'
import './globals.css'

const RootLayout = ({
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

export default RootLayout
