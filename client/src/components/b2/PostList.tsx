import React, { useEffect, useState } from "react";
import { getAllPosts, deletePost } from "../b2/Post";
import type { Post } from "../b1/Post";


export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getAllPosts().then((data) => setPosts(data));
  }, []);

  const handleDelete = async (id: number) => {
    await deletePost(id);
    setPosts(posts.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h2>Danh sách bài viết</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <img src={post.image} width="100" />
          <p>{post.date}</p>
          <button onClick={() => handleDelete(Number(post.id))}>Xóa</button>
        </div>
      ))}
    </div>
  );
}
