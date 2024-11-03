/* eslint-disable react/prop-types */
import { useState, useContext } from "react";
import PostService from "../../../services/postService.js";
import { Context } from "../../../context.js";
import {toast } from "react-toastify";

export default function CreatePost({ isOpen, onClose }) {
  const { store, postStore } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const postService = new PostService();
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append("title", event.target.postTitle.value);
    formData.append("content", event.target.postContent.value);

    const fileInput = event.target.postFile;
    if (fileInput.files.length > 0) {
      formData.append("file", fileInput.files[0]);
    }

    try {
      const newPost = await postService.createPost({
        user_id: store.user.id,
        title: event.target.postTitle.value,
        content: event.target.postContent.value,
        file: fileInput.files.length > 0 ? fileInput.files[0] : null,
      });
      postStore.addPosts(newPost);
      onClose();
      event.target.reset();
      toast("Пост створено!");

    } catch (error) {
      setError(error.response?.data?.message || "Помилка при створенні поста");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Створити пост</h2>
          <button className="close-modal" onClick={onClose}>
            ×
          </button>
        </div>

        <form className="create-post-form" onSubmit={handleSubmit}>
          <label htmlFor="postTitle">Заголовок</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            placeholder="Введіть заголовок"
            required
          />

          <label htmlFor="postContent">Контент</label>
          <textarea
            id="postContent"
            name="postContent"
            placeholder="Введіть текст поста"
            rows="4"
            required
          ></textarea>

          <label htmlFor="postFile">Завантажити фото</label>
          <input type="file" id="postFile" name="postFile" />

          {error && <p className="error-message">{error}</p>}

          <div className="modal-footer">
            <button type="submit" className="submit-post" disabled={loading}>
              {loading ? "Завантаження..." : "Опублікувати"}
            </button>
            <button
              type="button"
              className="cancel-post"
              onClick={onClose}
            >
              Скасувати
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
