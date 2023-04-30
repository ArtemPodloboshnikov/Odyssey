import Sidebar from '@/components/Sidebar'
import './globals.css'

export const revalidate = 60;

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <main className="grid grid-cols-6 h-screen">
          {children}
        </main>
        <Sidebar/>
      </body>
    </html>
  )
}
