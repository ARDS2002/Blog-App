'use client'
import { useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export default function NewPost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        router.push('/auth/signin')
        return
      }

      const slug = title.toLowerCase().replace(/[^\w-]+/g, '-')
      
      const { error } = await supabase.from('posts').insert({
        title,
        content,
        user_id: user.id,
        slug,
        published: true,
      })

      if (error) {
        console.error('Error:', error)
        throw error
      }

      router.push('/dashboard')
      router.refresh()
    } catch (error) {
      console.error('Error creating post:', error)
    }
  }

  return (
    <div className="mx-auto max-w-2xl">
      <h1 className="mb-8 font-bold text-3xl">Create New Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-2 border rounded w-full"
            required
          />
        </div>
        <div>
          <label className="block mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="p-2 border rounded w-full h-64"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-white"
        >
          Publish Post
        </button>
      </form>
    </div>
  )
}