/* eslint-disable react/prop-types */
import { useState, useEffect, useContext } from "react";
import "./ProfileEditForm.scss";
import { Context } from "../../../context";

const ProfileEditForm = ({ isOpen, onClose, user }) => {
  const { store } = useContext(Context);

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [image, setImage] = useState(user?.file || "");


  useEffect(() => {
    if (isOpen) {
      setName(user?.name || "");
      setBio(user?.bio || "");
      setImage(user?.file || "");

    }
  }, [isOpen, user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !bio) {
      alert("Будь ласка, заповніть усі поля.");
      return;
    }
    const updatedProfile = { name, bio};

    await store.updateUserProfile(updatedProfile)
    onClose(); 
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <form className="profile-edit-form" onSubmit={handleSubmit}>
        <h2 className="form-title">Редагування профілю</h2>
        <div className="form-group">
          <label htmlFor="name">Імя</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="bio">Опис профіля</label>
          <input
            type="text"
            id="bio"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Фотка Профіля </label>
          <input
            type="file"
            id="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            
          />
        </div>
        <button type="submit" className="profile-btn">
          Зберегти зміни
        </button>
        <button type="button" className="close-btn" onClick={onClose}>
          Закрити
        </button>
      </form>
    </div>
  );
};

export default ProfileEditForm;
