import React, { useState } from "react";
import { addPost, getAllPosts, Post } from "../b6/Post";
import ConfirmModal from "../b5/ConfirmModal";

interface AddPostFormProps {
  onSuccess: () => void; 
  onClose: () => void;
}

export default function FormPost({ onSuccess, onClose }: AddPostFormProps) {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [content, setContent] = useState("");

  const [isConfirmReset, setIsConfirmReset] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    if (!title.trim() || !image.trim() || !content.trim()) {
      setError("Tên bài viết, hình ảnh và nội dung không được để trống");
      return;
    }

    const posts = await getAllPosts();
    if (posts.some((p) => p.title === title.trim())) {
      setError("Tên bài viết không được phép trùng");
      return;
    }

    await addPost({
      title,
      image,
      content,
      date: new Date().toISOString(),
      status: "published",
    });

    onSuccess();
    onClose();  
  };

  const handleReset = () => {
    setTitle("");
    setImage("");
    setContent("");
    setIsConfirmReset(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[600px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Thêm mới bài viết</h2>
          <button onClick={onClose} className="text-gray-500">✕</button>
        </div>

        <div className="mb-3">
          <label className="block mb-1">Tên bài viết</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border w-full p-2 rounded"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Hình ảnh</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="border w-full p-2 rounded"
          />
        </div>
        <div className="mb-3">
          <label className="block mb-1">Nội dung</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="border w-full p-2 rounded h-32"
          />
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={() => setIsConfirmReset(true)}
            className="px-4 py-2 rounded border border-gray-300 hover:bg-gray-100"
          >
            Làm mới
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Xuất bản
          </button>
        </div>
      </div>

      <ConfirmModal
        isOpen={isConfirmReset}
        onClose={() => setIsConfirmReset(false)}
        onConfirm={handleReset}
        message="Bạn có chắc chắn muốn xóa hết dữ liệu trong form"
      />

      {error && (
        <ConfirmModal
          isOpen={!!error}
          onClose={() => setError(null)}
          onConfirm={() => setError(null)}
          message={error}
        />
      )}
    </div>
  );
}
