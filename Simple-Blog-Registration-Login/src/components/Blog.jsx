
import { useState } from "react";

const mockPosts = [
  {
    id: 1,
    author: "John Lobster",
    date: "01 January 2023",
    title: "If we quantify the alarm, we can get to the FTP pixel through the online SSL interface!",
    body: "Omnis perspiciatis qui quia commodi sequi modi. Nostrum quam aut cupiditate est facere omnis possimus. Tenetur similique nemo illo soluta molestias facere quo. Ipsam totam facilis delectus nihil quidem soluta vel est omnis.",
    likes: 12,
    tags: ["tag","tag","tag","tag","tag","tag","tag","tag","tag","tag"]
  },
  {
    id: 2,
    author: "John Lobster",
    date: "01 January 2023",
    title: "Try to generate the TCP bus, maybe it will override the neural bandwidth!",
    body: "Pariatur ut dolor repellendus dolores ut debitis. Est iusto neque dicta voluptatibus quia nulla consequatur. Omnis aut sed dolores qui laborum a amet.",
    likes: 64,
    tags: ["tag","tag","tag","tag","tag","tag","tag","tag","tag","tag"]
  },
  {
    id: 3,
    author: "John Lobster",
    date: "01 January 2023",
    title: "Use the auxiliary EXE monitor, then you can hack the haptic port!",
    body: "This is text",
    likes: 64,
    tags: ["tag","tag","tag","tag","tag","tag","tag","tag","tag","tag"]
  }
];

const popularTags = ["one","something","chinese","english","french"];

export default function Blog() {
  const [posts, setPosts] = useState(mockPosts);

  const handleLike = (id) => {
    setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + 1 } : p));
  };

  return (
    <div>
      <div className="tags-panel">
        <div className="title">Popular tags</div>
        <div className="tags">
          {popularTags.map((t) => (
            <span key={t} className="tag">{t}</span>
          ))}
        </div>
      </div>

      {posts.map((post) => (
        <article key={post.id} className="article">
          <div className="meta">
            <div>
              <div className="author">{post.author}</div>
              <div className="date">{post.date}</div>
            </div>
            <button className="like-btn" onClick={() => handleLike(post.id)}>
              <span>❤</span>
              <span>{post.likes}</span>
            </button>
          </div>
          <h2 className="title">{post.title}</h2>
          <p className="preview">{post.body}</p>
          <div className="tags" style={{marginTop: 8}}>
            {post.tags.map((t, i) => (
              <span key={i} className="tag">{t}</span>
            ))}
          </div>
        </article>
      ))}

      <div className="pagination">
        {[1,2,3,4,5,6,7].map(n => (
          <button key={n} className={n===1 ? "page active":"page"}>{n}</button>
        ))}
      </div>
    </div>
  );
}
