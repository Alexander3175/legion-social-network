import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context.js";
import PostService from "../../../services/postService.js";


export default function Posts() {
  const { store, postStore } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (!store.user || !store.user.id) {
          console.error("ID користувача не визначено");
          return;
        }

        const postsResponse = await PostService.fetchPosts();
        const userPost = postsResponse.filter(
          (post) => post.user.toString() === store.user.id
        );
        postStore.setPosts(userPost);
      } catch (e) {
        console.error("Помилка під час отримання постів:", e);
      } finally {
        setLoading(false);
      }
    };

    if (store.user && store.user.id) {
      fetchData();
    }
  }, [store.user]);

  return (
    <>
        {loading ? (
          <p>Завантаження постів...</p>
        ) : postStore.posts?.length > 0 ? (
          postStore.posts.map((post) => (
            <div className="profile-post-item" key={post._id}>
              <div className="post-item__content">
                <div className="post-item__image">
                  {post.file ? (
                    post.file.endsWith(".mp4") ? (
                      <video
                        controls
                        className="post-video"
                        src={`http://localhost:8080/server/${post.file.replace(/\\/g, "/")}`}
                        alt="Відео посту"
                      />
                    ) : (
                      <img
                        src={`http://localhost:8080/server/${post.file.replace(/\\/g, "/")}`}
                        alt="Зображення посту"
                        className="post-image"
                      />
                    )
                  ) : (
                    <div className="image-default"></div>
                  )}
                </div>

                <div className="post-item__details">
                  <h4>{post.title}</h4>
                  <p>{post.content}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>У вас нема постів</p>
        )}
    </>
  );
}
