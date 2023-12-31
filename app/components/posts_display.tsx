import { headers } from "next/headers";
import { prisma } from "../db";
import { remark } from 'remark';
import html from 'remark-html';
import 'server-only'

export default async function PostsDisplay() {
  // force dynamic rendering of this component
  const headersList = headers();

  const posts = await prisma.posts.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const postsList = posts.map((post) => {
    return <Post post={post} key={post.id} />;
  });

  return (
    <div className="flex justify-center">
      <div className="grid grid-flow-row grow md:grow-0 md:w-[100ch]">
        {postsList}
      </div>
    </div>
  );
}

async function Post({
  post,
}: {
  post: {
    id: number;
    title: string;
    content: string | null;
    imageUrl: string | null;
    imageAlt: string | null;
    createdAt: Date;
  };
}) {
  const content = (await remark().use(html).process(post.content ?? "")).toString()

  return (
    <div className="p-3 m-3 bg-slate-50 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold">{post.title}</h2>
      {/* TODO: Add a share feature */}
      {post.content ? <div className="prose" dangerouslySetInnerHTML={{ __html: content }}></div> : <></>}
      {post.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.imageUrl} alt={post.imageAlt ?? ""} className="rounded-xl m-4 object-contain md:max-w-3xl" />
      ) : (
        <></>
      )}
    </div>
  );
}
