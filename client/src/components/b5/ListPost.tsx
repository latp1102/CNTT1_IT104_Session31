import React, { useEffect, useState } from "react";
import { getAllPosts, togglePostStatus, Post } from "../b5/Post";
import ConfirmModal from "./ConfirmModal";

export default function ListPost() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getAllPosts().then(setPosts);
  }, []);

  const handleToggleClick = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleConfirm = async () => {
    if (!selectedPost) return;
    const newStatus = selectedPost.status === "published" ? "unpublished" : "published";
    await togglePostStatus(selectedPost.id, newStatus);
    setPosts((prev) =>
      prev.map((p) => (p.id === selectedPost.id ? { ...p, status: newStatus } : p))
    );
    setIsModalOpen(false);
    setSelectedPost(null);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Danh sách bài viết</h2>
      {posts.map((post) => (
        <div key={post.id} className="border p-3 mb-2 rounded shadow-sm">
          <h3>{post.title}</h3>
          <p>Trạng thái: {post.status === "published" ? "Đã xuất bản" : "Ngừng xuất bản"}</p>
          <button
            onClick={() => handleToggleClick(post)}
            className="mt-2 px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600"
          >
            {post.status === "published" ? "Chặn" : "Mở lại"}
          </button>
        </div>
      ))}

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirm}
        message="Bạn có chắc chắn muốn ngừng xuất bản bài viết?"
      />
    </div>
  );
}
