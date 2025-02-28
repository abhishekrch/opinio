import { ClerkProvider } from '@clerk/nextjs'
import './globals.css'
import { PageHeader } from '@/components/page-header'

export const metadata = {
  title: "Opinio",
  description: "Collect your feedback seamlessly",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <PageHeader />
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}