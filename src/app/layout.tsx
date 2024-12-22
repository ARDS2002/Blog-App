import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'
import SupabaseProvider from '@/components/providers/supabase-provider'
import { cookies } from 'next/headers'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Blog App',
  description: 'A simple blog application',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({
    cookies: () => cookieStore,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  return (
    <html lang="en">
      <body className={inter.className}>
        <SupabaseProvider>
          <Navbar session={session} />
          <main className="mx-auto px-4 py-8 container">
            {children}
          </main>
        </SupabaseProvider>
      </body>
    </html>
  )
}