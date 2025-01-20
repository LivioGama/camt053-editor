'use client'
import {Provider} from '@/components/ui/provider'
import {enable$GetSet} from '@legendapp/state/config/enable$GetSet'
import './globals.css'
import {QueryClient, QueryClientProvider} from '@tanstack/react-query'

enable$GetSet()

const queryClient = new QueryClient()

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode
}>) => (
  <html lang='en' suppressHydrationWarning={true}>
    <body>
      <QueryClientProvider client={queryClient}>
        <Provider>{children}</Provider>
      </QueryClientProvider>
    </body>
  </html>
)

export default RootLayout
