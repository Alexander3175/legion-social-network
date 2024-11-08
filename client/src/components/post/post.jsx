import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../context.js";
import userService from "../../services/userService.js";
import postService from "../../services/postService.js";

import "./postStyle.scss";

const Posts = observer(() => {
  const { postStore } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await postService.fetchPosts();

        const postsWithUsers = await Promise.all(
          postsResponse.map(async (post) => {
            const user = await userService.fetchUserById(post.user);
            return { ...post, user };
          })
        );

        postStore.setPosts(postsWithUsers);
      } catch (e) {
        console.error("Помилка під час отримання постів:", e);
      }
    };

    fetchData();
  }, [postStore]);

  const handleLike = async (postId) => {
    try {
      const updatedPost = await postService.like(postId);
  
      const user = await userService.fetchUserById(updatedPost.user);
      
      const updatedPostWithUser = { ...updatedPost, user };
  
      const updatedPosts = postStore.posts.map((post) =>
        post._id === updatedPostWithUser._id ? updatedPostWithUser : post
      );
      postStore.setPosts(updatedPosts);
  
    } catch (error) {
      console.error("Помилка під час лайку поста:", error);
    }
  };
  

  return (
    <div className="post-wrapper">
      <div className="post-conteiner">
        <div className="post-content">
          {postStore.posts?.length > 0 ? (
            postStore.posts.map((elem) => (
              <div className="post-item" key={elem._id}>
                <div className="post-information">
                  <div className="fromAccount-image"></div>
                  <div className="post-information__from">
                    <h3 className="accountName">
                      {elem.user.name || "Невідомий користувач"}
                    </h3>
                    <h5 className="accountData">
                      {new Date(elem.createdAt).toLocaleString() ||
                        "Час невідомий"}
                    </h5>
                  </div>
                </div>
                <div className="post-item__content">
                  <h3>{elem.title || "title відсутній"}</h3>
                  <p>{elem.content || "Контент відсутній"}</p>
                </div>
                <div className="post-item__photo">
                  {elem.file ? (
                    elem.file.endsWith(".mp4") ? (
                      <video
                        controls
                        className="post-video"
                        src={`http://localhost:8080/server/${elem.file.replace(
                          /\\/g,
                          "/"
                        )}`}
                        alt="Відео посту"
                      />
                    ) : (
                      <img
                        src={`http://localhost:8080/server/${elem.file.replace(
                          /\\/g,
                          "/"
                        )}`}
                        alt="Зображення посту"
                        className="post-image"
                      />
                    )
                  ) : (
                    <div className="image-test"></div>
                  )}
                </div>

                <div className="post-item__likes">
                  <div
                    className="test-imageLikes"
                    onClick={() => handleLike(elem._id)}
                  ></div>
                  <p>Вподобали: {elem.like || 0} Користувачів</p>
                </div>
              </div>
            ))
          ) : (
            <p>Немає постів</p>
          )}
        </div>
      </div>
    </div>
  );
});

export default Posts;
