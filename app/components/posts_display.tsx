import { prisma } from "../db";


export default async function PostsDisplay() {
  const posts = await prisma.posts.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const postsList = posts.map((post) => {
    return <Post post={post} key={post.id} />;
  });

  return (
    <div className="grid grid-flow-row gap-4">
        {postsList}
    </div>
  );
}

function Post({
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
  return (
    <div className="p-3 m-3 bg-slate-200 rounded-xl shadow-xl">
      <h2 className="text-3xl font-bold">{post.title}</h2>
      {/* TODO: Add a share feature */}
      {post.content ? <p className="text-xl">{post.content}</p> : <></>}
      {post.imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={post.imageUrl} alt={post.imageAlt ?? ""} className="rounded-xl m-4 object-contain md:max-w-3xl" />
      ) : (
        <></>
      )}
    </div>
  );
}
