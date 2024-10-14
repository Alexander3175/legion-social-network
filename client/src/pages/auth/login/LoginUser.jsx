import { Link } from "react-router-dom";
import "../styles/auth.scss";
import { useContext, useState } from "react";
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

  return (
    <section className="auteficationSection">
      <h2 style={{ fontSize: "2em" }}>Legion</h2>
      <div className="autefication-conteiner">
        <h2 style={{ marginBottom: "80px" }}>Авторизація</h2>
        <form
          action=""
          className="auteficationForm"
          method="POST"
          onSubmit={handleSubmit}
        >
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
          <p>
            Продовжуючи, ви погоджуєтеся з Умовами використання та Повідомленням
            про конфіденційність Legion.
          </p>
        </form>
      </div>
      <h3 className="Accountinformation">Вже є аккаунт?</h3>
      <button className="authentication" id="bth_reg">
        <Link to="/reg">Створити акаунт в Legion?</Link>
      </button>
    </section>
  );
}
const ObservedLoginUser = observer(LoginUser);

export default ObservedLoginUser;
