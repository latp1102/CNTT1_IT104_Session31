import axios from "axios";

export interface Post {
  id: number;
  title: string;
  image: string;
  date: string;
  status: "published" | "unpublished";
}

const api = axios.create({
  baseURL: "http://localhost:8080/posts",
});

export async function getAllPosts(): Promise<Post[]> {
  const res = await api.get<Post[]>("/");
  return res.data;
}

export async function togglePostStatus(
  id: number,
  status: "published" | "unpublished"
): Promise<Post> {
  const res = await api.patch<Post>(`/${id}`, { status });
  return res.data;
}
