import axios from "axios";
import type { Post } from "../b1/Post";

export function getAllPosts(): Promise<Post[]> {
  return axios.get<Post[]>("http://localhost:8080/posts")
    .then(res => res.data);
}

export function addPost(post: Omit<Post, "id">): Promise<Post> {
  return axios.post<Post>("http://localhost:8080/posts", post)
    .then(res => res.data);
}

export function deletePost(id: number): Promise<void> {
  return axios.delete(`http://localhost:8080/posts/${id}`)
    .then(() => {});
}
