import { useEffect, useState } from "react";
import "./App.css";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Post {
  id: string;
  created_at: string;
  updated_at?: string;
  content?: string;
}

function App() {
  const [markdownState, setMarkDownState] = useState("");
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    const getPosts = () => fetch("http://localhost:3000/");
    getPosts()
      .then((res) => res.json())
      .then((p) => setPosts(p));
  }, []);

  return (
    <>
      <h1>Only Exhausting Art</h1>
      <div className="card">
        <p>Existing Posts</p>
        <button disabled>Create New Post</button>
      </div>
      <div className="content">
        <form>
          <textarea
            onInput={(e) =>
              setMarkDownState((e.target as HTMLTextAreaElement).value)
            }
          ></textarea>
        </form>
        <div className="preview">
          <Markdown remarkPlugins={[remarkGfm]}>{markdownState}</Markdown>
        </div>
      </div>
      {console.log(posts)}
      <div>
        {posts?.map((p) => (
          <p>
            {p.id} – {p.created_at}
          </p>
        ))}
      </div>
    </>
  );
}

export default App;
