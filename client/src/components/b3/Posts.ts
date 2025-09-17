import axios from "axios";

export interface Post {
  id: number;
  title: string;
  image: string;
  date: string;
  status: "published" | "draft";
  content: string;
}

const API_URL = "http://localhost:8080/posts"; 

export async function getAllPosts(): Promise<Post[]> {
  const res = await axios.get<Post[]>(API_URL);
  return res.data;
}

export async function addPost(post: Omit<Post, "id">): Promise<Post> {
  const res = await axios.post<Post>(API_URL, post);
  return res.data;
}

export async function deletePost(id: number): Promise<void> {
  await axios.delete(`${API_URL}/${id}`);
}
