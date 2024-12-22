'use client'
import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { useRouter } from 'next/navigation'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    if (!error) {
      router.push('/')
    }
    if(error){
      alert("Failed!")
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <h1 className="mb-8 font-bold text-3xl">Sign In</h1>
      <form onSubmit={handleSignIn} className="space-y-4">
        <div>
          <label className="block mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded w-full text-white"
        >
          Sign In
        </button>
      </form>
    </div>
  )
}