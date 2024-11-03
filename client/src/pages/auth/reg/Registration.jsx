import { Link, Navigate } from "react-router-dom";
import "../styles/auth.scss";
import { useContext, useState } from "react";
import { Context } from "../../../context.js";
import { observer } from "mobx-react-lite";
import {ToastContainer, toast } from "react-toastify";
  import 'react-toastify/dist/ReactToastify.css';

function RegistrationUser() {
  const [username, setUsername] = useState("");
  const [userGmail, setUsergmail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const [passwordcheck, setPasswordcheck] = useState("");
  const [redirect, setRedirect] = useState(false);
  const { store } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (userpassword !== passwordcheck) {
      toast.error("Паролі не співпадають");
      return;
    }

    try {
      await store.registration(username, userGmail, userpassword);
      toast.success("Ви успішно створили акаунт!");
      setTimeout(() => {
        setRedirect(true);
      }, 3000);    } catch (error) {
      console.error("Помилка реєстрації:", error);
      const errorMessage = error.response?.data?.message || "Сталася помилка при реєстрації. Спробуйте ще раз.";
      toast.error(errorMessage);
    }

    setUsername("");
    setUsergmail("");
    setUserpassword("");
    setPasswordcheck("");
  };
  if (redirect) {
    return <Navigate to="/login" />;
  }
  return (
    <section className="registrationSection">
      <h2 className="title">Legion</h2>
      <div className="registration-container">
        <h2 className="subtitle">Створення Акаунта</h2>
        <form className="registrationForm" method="POST" onSubmit={handleSubmit}>
          <label htmlFor="username">Ваше Імя</label>
          <input
            type="text"
            name="username"
            id="username"
            required
            placeholder="Ваше Ім'я"
            maxLength="10"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="userGmail">Email</label>
          <input
            type="email"
            name="userGmail"
            id="userGmail"
            required
            placeholder="Email"
            maxLength="20"
            value={userGmail}
            onChange={(e) => setUsergmail(e.target.value)}
          />

          <label htmlFor="userpassword">Пароль</label>
          <input
            type="password"
            name="userpassword"
            id="userpassword"
            required
            placeholder="Ваш пароль"
            maxLength="24"
            value={userpassword}
            onChange={(e) => setUserpassword(e.target.value)}
          />

          <label htmlFor="passwordcheck">Повторіть пароль</label>
          <input
            type="password"
            name="passwordcheck"
            id="passwordcheck"
            required
            placeholder="Повторіть пароль"
            maxLength="24"
            value={passwordcheck}
            onChange={(e) => setPasswordcheck(e.target.value)}
          />

          <button type="submit" id="bth-submit">
            Створити акаунт
          </button>
          <p className="terms">
            Продовжуючи, ви погоджуєтеся з Умовами використання та Повідомленням
            про конфіденційність Legion.
          </p>
        </form>
      </div>

      <h3 className="Accountinformation">Вже є акаунт?</h3>
      <button className="authentication" id="bth_auth">
        <Link to="/login">Увійти в акаунт Legion?</Link>
      </button>
      <ToastContainer />
    </section>
  );
}

const ObservedRegistrationUser = observer(RegistrationUser);
export default ObservedRegistrationUser;
