import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Link from 'next/link'
import { formatDistance } from 'date-fns'

export const revalidate = 0 

export default async function Home() {
  const cookieStore = cookies()
  const supabase = createServerComponentClient({ cookies: () => cookieStore })

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('published', true)
    .order('created_at', { ascending: false })

  return (
    <div>
      <h1 className="mb-8 font-bold text-3xl">Latest Posts</h1>
      <div className="gap-6 grid">
        {posts?.map((post) => (
          <article key={post.id} className="p-6 border rounded-lg">
            <h2 className="mb-2 font-bold text-2xl">
              <Link href={`/posts/${post.slug}`}>{post.title}</Link>
            </h2>
            <p className="mb-4 text-gray-600">
              {post.content.substring(0, 200)}...
            </p>
            <p className="text-gray-500 text-sm">
              {formatDistance(new Date(post.created_at), new Date(), {
                addSuffix: true,
              })}
            </p>
          </article>
        ))}
        {!posts?.length && (
          <p className="text-gray-500">No posts available.</p>
        )}
      </div>
    </div>
  )
}