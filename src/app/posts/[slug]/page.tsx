import { supabase } from '@/lib/supabase'
import { formatDistance } from 'date-fns'
import { notFound } from 'next/navigation'

export default async function Post({ params }: { params: { slug: string } }) {
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single()

  if (!post) {
    notFound()
  }

  return (
    <article className="mx-auto max-w-2xl">
      <h1 className="mb-4 font-bold text-4xl">{post.title}</h1>
      <p className="mb-8 text-gray-500">
        {formatDistance(new Date(post.created_at), new Date(), {
          addSuffix: true,
        })}
      </p>
      <div className="lg:prose-xl prose">
        {post.content.split('\n').map((paragraph: string, i: number) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </article>
  )
}