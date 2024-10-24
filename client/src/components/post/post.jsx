import { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../../context.js";
import userService from "../../services/userService.js";
import "./postStyle.scss";

const Posts = observer(() => {
  const { postStore } = useContext(Context);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsResponse = await userService.fetchPosts();

      } catch (e) {
        console.error("Помилка під час отримання постів:", e);
      }
    };

    fetchData();
  }, [postStore]);

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
                    <h3 className="accountName">{elem.userName || "Невідомий користувач"}</h3>
                    <h5 className="accountData">{new Date(elem.createdAt).toLocaleString() || "Час невідомий"}</h5>
                  </div>
                </div>
                <div className="post-item__content">
                  <p>{elem.title || "title відсутній"}</p>
                  <p>{elem.content || "Контент відсутній"}</p>
                </div>
                <div className="post-item__photo">
                  {elem.image ? (
                    <img src={elem.image} alt="Зображення посту" className="post-image" />
                  ) : (
                    <div className="image-test"></div>
                  )}
                </div>
                <div className="post-item__likes">
                  <div className="test-imageLikes"></div>
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
