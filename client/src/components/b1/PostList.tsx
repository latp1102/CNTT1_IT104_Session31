import React, { useEffect, useState } from "react";
import { getAllPosts, deletePost, type Post } from "./Post";

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
    <div className="p-6">
      <div className="flex items-center gap-4 mb-4">
        <input
          type="text"
          placeholder="Nhập từ khóa tìm kiếm"
          className="border rounded px-3 py-2 w-1/3 focus:outline-none focus:ring focus:ring-blue-200"
        />
        <select className="border rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200">
          <option value="">Lọc bài viết</option>
          <option value="published">Đã xuất bản</option>
          <option value="draft">Bản nháp</option>
        </select>
        <button className="ml-auto bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Thêm mới bài viết
        </button>
      </div>

      <table>
        <thead className="bg-gray-100">
          <tr>
            <th className="border border-gray-300 px-4 py-2">STT</th>
            <th className="border border-gray-300 px-4 py-2">Tiêu đề</th>
            <th className="border border-gray-300 px-4 py-2">Hình ảnh</th>
            <th className="border border-gray-300 px-4 py-2">Ngày viết</th>
            <th className="border border-gray-300 px-4 py-2">Trạng thái</th>
            <th className="border border-gray-300 px-4 py-2">Chức năng</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post, index) => (
            <tr key={post.id}>
              <td className="border border-gray-300 px-4 py-2">
                {index + 1}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {post.title}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-16 h-16"
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">{post.date}</td>
              <td className="border border-gray-300 px-4 py-2">
                {post.status === "published" ? (
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                    Đã xuất bản
                  </span>
                ) : (
                  <span className="px-2 py-1 bg-gray-200 text-gray-600 rounded">
                    Bản nháp
                  </span>
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2 space-x-2">
                <button className="bg-yellow-400 text-white px-3 py-1 rounded">
                  Chặn
                </button>
                <button className="bg-blue-500 text-white px-3 py-1 rounded ">
                  Sửa
                </button>
                <button
                  onClick={() => handleDelete(post.id!)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
