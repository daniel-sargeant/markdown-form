import { useEffect, useState, type FormEventHandler } from "react";
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
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  useEffect(() => {
    const getPosts = () => fetch("http://localhost:3000/");
    getPosts()
      .then((res) => res.json())
      .then((p) => setPosts(p));
  }, []);

  const submitPost = async (body: string) =>
    await fetch("http://localhost:3000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

  return (
    <>
      <h1>Only Exhausting Art</h1>
      <div className="card">
        <p>Existing Posts</p>
        <div
          style={{ display: "flex", flexDirection: "column", width: "500px" }}
        >
          {posts?.map((p) => (
            <button
              onClick={() => {
                setCurrentPost(p);
                setMarkDownState(p.content!);
              }}
            >
              {p.id} – {p.created_at}
            </button>
          ))}
        </div>
        <button
          onClick={() => {
            setCurrentPost(null);
            setMarkDownState("");
          }}
        >
          New Post
        </button>
        <button
          form={currentPost ? currentPost.id : "new"}
          type="submit"
          disabled={!markdownState.length}
          onClick={() =>
            submitPost(
              JSON.stringify({
                id: currentPost ? currentPost.id : null,
                content: markdownState,
              })
            )
          }
        >
          Submit Post
        </button>
      </div>
      <div className="content">
        <form name={currentPost ? currentPost.id : "new"}>
          <textarea
            onInput={(e) =>
              setMarkDownState((e.target as HTMLTextAreaElement).value)
            }
            value={markdownState}
          ></textarea>
        </form>
        <div className="preview">
          <Markdown remarkPlugins={[remarkGfm]}>{markdownState}</Markdown>
        </div>
      </div>
    </>
  );
}

export default App;
