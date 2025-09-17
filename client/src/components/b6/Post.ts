import axios from "axios";

export interface Post {
  id: number;
  title: string;
  image: string;
  content: string;
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

export async function addPost(post: Omit<Post, "id">): Promise<Post> {
  const res = await api.post<Post>("/", post);
  return res.data;
}
