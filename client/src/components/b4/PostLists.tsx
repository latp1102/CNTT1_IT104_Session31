import React, { useEffect, useState } from "react";
import { getAllPosts, type Post } from "../b4/Posts";
import ReactMarkdown from "react-markdown";

export default function PostLists() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    getAllPosts().then((data) => setPosts(data));
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Danh sách bài viết</h2>
      <table className="w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Tiêu đề</th>
            <th className="p-2 border">Trạng thái</th>
            <th className="p-2 border">Nội dung</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="hover:bg-gray-50">
              <td className="p-2 border">{post.title}</td>
              <td className="p-2 border">{post.status}</td>
              <td className="p-2 border text-left">
                <ReactMarkdown>{post.content}</ReactMarkdown>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
