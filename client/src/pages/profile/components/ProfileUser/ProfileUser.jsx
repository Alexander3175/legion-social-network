
import { useContext, useState } from "react";
import { Context } from "../../../../context.js";
import api, { API_URL } from "../../../../http/index.js";


export default function ProfileUser() {
  const { store } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true); 
  };

  const closeModal = () => {
    setIsModalOpen(false); 
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const title = event.target.postTitle.value;
    const content = event.target.postContent.value;

    try {
      const response = await api.post(`${API_URL}/createPost`, { title, content });
  
      console.log('Пост створено:', response.data);
    } catch (error) {
      console.error('Помилка при створенні поста:', error.response?.data || error);
    }
  
    closeModal();
  };

  

  return (
    <section className="wrapper-profile">
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-container">
            <div className="modal-header">
              <h2>Створити пост</h2>
              <button className="close-modal" onClick={closeModal}>
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
              <input
                type="file"
                id="postFile"
                name="postFile"
              />

              <div className="modal-footer">
                <button type="submit" className="submit-post">
                  Опублікувати
                </button>
                <button type="button" className="cancel-post" onClick={closeModal}>
                  Скасувати
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-image">
            <img src="/path/to/profile-pic.jpg" alt="User Profile" />
          </div>
          <div className="profile-info">
            <h2 className="username">{store.user.name}</h2>
            <p className="bio">
              {store.user?.bio ||
                "Коротка біографія користувача. Розкажіть щось цікаве про себе."}
            </p>
            <div className="profile-container__btn">
              <button className="profile-btn">Редагувати профіль</button>
              <button className="profile-btn" onClick={() => store.logout()}>
                LOGOUT
              </button>
            </div>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-item">
            <h4>Пости</h4>
            <p>{store.user?.posts?.length || 0}</p>
          </div>
          <div className="stat-item">
            <h4>Підписники</h4>
            <p>0</p>
          </div>
          <div className="stat-item">
            <h4>Підписки</h4>
            <p>0</p>
          </div>
        </div>

        <div className="profile-posts">
          <h3>Мої пости</h3>
          <div className="profile-post-item">Тут буде пост №1</div>
          <div className="profile-post-item">Тут буде пост №2</div>
          <div className="profile-post-item">Тут буде пост №3</div>
        </div>

        <div className="profile-create-posts" onClick={openModal}>
          Створити пост
        </div>
      </div>
    </section>
  );
}
