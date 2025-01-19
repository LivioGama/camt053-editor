import {Provider} from '@/components/ui/provider'
import './globals.css'
import {enable$GetSet} from '@legendapp/state/config/enable$GetSet'

enable$GetSet()

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
