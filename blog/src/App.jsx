import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  // Fetch blogs from the server
  useEffect(() => {
    axios
      .get("http://localhost:3000/blogs")
      .then((response) => {
        setBlogs(response.data);
      })
      .catch((error) => {
        console.error("Error fetching blogs:", error);
      });
  }, []);

  // add a new blog
  const addBlog = (event) => {
    event.preventDefault();
    const blogObj = {
      author,
      title,
      content,
    };
      axios
        .post("http://localhost:3000/blogs", blogObj)
        .then((response) => {
          console.log("Blog added:", response.data);
          setBlogs([...blogs, response.data]);
          setAuthor("");
          setTitle("");
          setContent("");
        })
        .catch((error) => {
          console.error("Error adding blog:", error);
        });
  };

  return (
    <div>
      <h1>BLOGS</h1>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <h3>{blog.title}</h3>
            <p>
              <strong>Author:</strong> {blog.author}
            </p>
            <p>{blog.content}</p>
          </li>
        ))}
      </ul>

      <form onSubmit={addBlog}>
        <div>
          Author:
          <input
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
            placeholder="author"
          />
        </div>
        <div>
          Title:
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="title"
          />
        </div>
        <div>
          Content:
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            placeholder="your blog content"
          />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default App;
