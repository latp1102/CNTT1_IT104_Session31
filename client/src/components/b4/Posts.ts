import axios from "axios";

export interface Post {
  id?: number;
  title: string;
  image: string;
  date: string;
  status: "published" | "draft";
  content: string;
}

export async function getAllPosts(): Promise<Post[]> {
  const res = await axios.get<Post[]>("http://localhost:8080/postss");
  return res.data;
}

export async function addPost(post: Post) {
  const res = await axios.post<Post>("http://localhost:8080/postss", post);
  return res.data;
}

export async function deletePost(id: number) {
  await axios.delete(`${" http://localhost:8080/postss"}/${id}`);
}
