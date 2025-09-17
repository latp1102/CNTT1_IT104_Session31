import axios from "axios";

export interface Post {
  id?: number;       
  title: string;
  image: string;
  date: string;
  starus: boolean;
}

export async function getAllPosts(): Promise<Post[]> {
  const res = await axios.get<Post[]>("http://localhost:8080/posts");
  return res.data;
}

export async function addPost(post: Post): Promise<Post> {
  const res = await axios.post<Post>("http://localhost:8080/posts", post);
  return res.data;
}

export async function updatePost(id: number, post: Post): Promise<Post> {
  const res = await axios.put<Post>(`http://localhost:8080/posts/${id}`, post);
  return res.data;
}

export async function deletePost(id: number): Promise<void> {
  await axios.delete(`http://localhost:8080/posts/${id}`);
}
