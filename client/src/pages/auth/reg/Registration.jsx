import { Link } from "react-router-dom";
import "../styles/auth.scss";
import { useContext, useState } from "react";
import { Context } from "../../../context.js";
import { observer } from "mobx-react-lite";

function RegistrationUser() {
  const [username, setUsername] = useState("");
  const [userGmail, setUsergmail] = useState("");
  const [userpassword, setUserpassword] = useState("");
  const { store } = useContext(Context);

  const handleSubmit = (e) => {
    e.preventDefault();
    store.registration(username, userGmail, userpassword);
  };
  return (
    <section className="registrationSection">
      <h2 style={{ fontSize: "2em" }}>Legion</h2>
      <div className="registration-container">
        <h2 style={{ marginBottom: "80px" }}>Створення Акаунта</h2>
        <form
          action=""
          className="registrationForm"
          method="POST"
          onSubmit={handleSubmit}
        >
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

          <label className="userGmail" htmlFor="userGmail">
            Email
          </label>
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

          <label className="userpassword" htmlFor="userpassword">
            Пароль
          </label>
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

          <label className="passwordcheck" htmlFor="passwordcheck">
            Повторіть пароль
          </label>
          <input
            type="password"
            name="passwordcheck"
            id="passwordcheck"
            required
            placeholder="Повторіть пароль"
            maxLength="24"
          />

          <input
            type="submit"
            name="submit"
            id="bth-submit"
            value="Створити акаунт"
          />
          <p>
            Продовжуючи, ви погоджуєтеся з Умовами використання та Повідомленням
            про конфіденційність Legion.
          </p>
        </form>
      </div>

      <h3 className="Accountinformation">Вже є акаунт?</h3>
      <button className="authentication" id="bth_auth">
        <Link to="/log">Увійти акаунт в Legion?</Link>
      </button>
    </section>
  );
}
const ObservedRegistrationUser = observer(RegistrationUser);

export default ObservedRegistrationUser;
