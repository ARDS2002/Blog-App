'use client'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import type { Session } from '@supabase/auth-helpers-nextjs'

type NavbarProps = {
  session: Session | null
}

export default function Navbar({ session }: NavbarProps) {
  const [user, setUser] = useState(session?.user ?? null)
  const supabase = createClientComponentClient()

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="mx-auto px-4 container">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="font-bold text-xl">
              Blog App
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/" className="hover:text-gray-600">
              Home
            </Link>
            {user ? (
              <>
                <Link href="/posts/new" className="hover:text-gray-600">
                  New Post
                </Link>
                <Link href="/dashboard" className="hover:text-gray-600">
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="hover:text-gray-600"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/signin" className="hover:text-gray-600">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="hover:text-gray-600">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}