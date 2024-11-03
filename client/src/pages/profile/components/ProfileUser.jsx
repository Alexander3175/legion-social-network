import { useContext, useState } from "react"; 
import { Context } from "../../../context.js";
import postStore from "../../../store/store-post.js";
import ProfileEditForm from "./ProfileEditForm.jsx";
import Posts from "./Posts.jsx";
import CreatePost from "./CreatePosts.jsx";
import { observer } from "mobx-react-lite";


 function ProfileUser() {
  const { store } = useContext(Context);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [isCreatePostModalOpen, setIsCreatePostModalOpen] = useState(false);



  const openEditProfileModal = () => {
    setIsEditProfileModalOpen(true);
  };

  const closeEditProfileModal = () => {
    setIsEditProfileModalOpen(false);
  };

  const openCreatePostModal = () => {
    setIsCreatePostModalOpen(true); 
  };

  const closeCreatePostModal = () => {
    setIsCreatePostModalOpen(false);
  };

  return (
    <section className="wrapper-profile">
      {isEditProfileModalOpen && (
        <ProfileEditForm isOpen={openEditProfileModal} onClose={closeEditProfileModal}/>
      )}

      {isCreatePostModalOpen && (
        <CreatePost isOpen={isCreatePostModalOpen} onClose={closeCreatePostModal} />
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
                <button className="profile-btn" onClick={openEditProfileModal}>
                  Редагувати профіль
                </button>
                <button className="profile-btn" onClick={() => store.logout()}>
                  LOGOUT
                </button>
              </div>
            </div>
          </div>

          <div className="profile-stats">
            <div className="stat-item">
              <h4>Пости</h4>
              <p>{postStore.posts?.length || 0}</p>
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
            <div className="profile-posts-conteiner">
            <Posts />
            </div>
          </div>

          <div className="profile-create-posts" onClick={openCreatePostModal}>
            Створити пост
          </div>
        </div>
    </section>
  );
}

const ObservedProfileUser = observer(ProfileUser);
export default ObservedProfileUser;
