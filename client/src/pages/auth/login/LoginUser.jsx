import { Link, useNavigate } from "react-router-dom";
import "../styles/auth.scss";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context.js";
import { observer } from "mobx-react-lite";
import {ToastContainer, toast } from "react-toastify";
  import 'react-toastify/dist/ReactToastify.css';
function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store } = useContext(Context);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await store.login(email, password);
      if (store.isAuth) {
        toast.success("Вітаємо! Ви успішно увійшли.");
        navigate("/");
      }
    } catch (error) {
      console.error("Помилка входу:", error);
      console.log("Деталі помилки:", error);
      const errorMessage = error.response?.data?.message || "Неправильний email або пароль. Спробуйте ще раз.";
      toast.error(errorMessage); 
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (store.isAuth && !store.user.id) {
        await store.getUserProfile();
      }
    };
  
    fetchUserProfile();
  }, [store, store.isAuth]);
  
  if (store.isAuth && !store.user.id) return <p>Завантаження...</p>;

 
  return (
    <section className="authenticationSection">
      <h2 className="title">Legion</h2>
      <div className="authentication-container">
        <h2 className="subtitle">Авторизація</h2>
        <form className="authenticationForm" method="POST" onSubmit={handleSubmit}>
          <label htmlFor="userGmail">Email</label>
          <input
            type="email"
            name="userGmail"
            id="userGmail"
            required
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />

          <label htmlFor="userpassword">Пароль</label>
          <input
            type="password"
            name="userpassword"
            id="userpassword"
            required
            placeholder="Ваш пароль"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          <button type="submit" id="bth-submit">
            LOGIN
          </button>
          <p className="terms">
            Продовжуючи, ви погоджуєтеся з Умовами використання та Повідомленням
            про конфіденційність Legion.
          </p>
        </form>
      </div>
      <h3 className="Accountinformation">Вже є акаунт?</h3>
      <button className="authentication" id="bth_reg">
        <Link to="/registration">Створити акаунт в Legion?</Link>
      </button>
      <ToastContainer/>
    </section>
  );
}

const ObservedLoginUser = observer(LoginUser);
export default ObservedLoginUser;
