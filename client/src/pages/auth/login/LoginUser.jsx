import { Link } from "react-router-dom";
import "../styles/auth.scss";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../../context.js";
import { observer } from "mobx-react-lite";

function LoginUser() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { store } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    store.login(email, password);
  };

  useEffect(() => {
    if (store.isAuth) {
      store.getUserProfile();
    }
  }, [store.isAuth]);

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
    </section>
  );
}

const ObservedLoginUser = observer(LoginUser);
export default ObservedLoginUser;
