//Синглтон
import { makeAutoObservable } from "mobx";

class PostStore {
  posts = [];

  constructor() {
    makeAutoObservable(this);
  }
  setPosts(posts) {
    this.posts = posts;
  }

  addPosts(post) {
    this.posts.push(post);
  }

  updatePosts(updatedPost) {
    const index = this.posts.findIndex((post) => post._id === updatedPost._id);
    if (index !== -1) {
      this.posts[index] = updatedPost;
    }
  }

  deletePosts(postId) {
    this.posts = this.posts.filter((post) => post._id !== postId);
  }
}

const postStore = new PostStore();
export default postStore;
