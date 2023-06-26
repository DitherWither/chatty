import PostsDisplay from "./components/posts_display";
import PostCreator from "./components/posts_creator";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-7xl font-black text-center my-12">chatty</h1>
      <div className="flex justify-center items-center m-3">
        <Link href="#create" className="underline text-fuchsia-400">write a shitpost</Link>
      </div>
      <h2 className="text-4xl font-bold text-center m-10">new shitposts</h2>
      <div className="m-2">
        <PostsDisplay />
        <h2 id="create" className="text-4xl font-bold text-center m-10">write a shitpost</h2>
        <PostCreator />
      </div>
    </main>
  );
}
