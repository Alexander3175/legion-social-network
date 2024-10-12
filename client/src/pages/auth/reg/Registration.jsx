import { Link } from 'react-router-dom';
import "../styles/auth.scss";

export default function Reg() {

  return (
    <section className="registrationSection">
      <h2 style={{ fontSize: '2em' }}>Legion</h2>
      <div className="registration-container">
        <h2 style={{ marginBottom: '80px' }}>Створення Акаунта</h2>
        <form action="" className="registrationForm" method="POST">

          <label htmlFor="username">Ваше Імя</label>
          <input
            type="text"
            name="username"
            id="username"
            required
            placeholder="Ваше Ім'я"
            maxLength="10"
          />

          <label className="userGmail" htmlFor="userGmail">Email</label>
          <input
            type="email"
            name="userGmail"
            id="userGmail"
            required
            placeholder="Email"
            maxLength="20"
          />

          <label className="userpassword" htmlFor="userpassword">Пароль</label>
          <input
            type="password"
            name="userpassword"
            id="userpassword"
            required
            placeholder="Ваш пароль"
            maxLength="24"
          />

          <label className="passwordcheck" htmlFor="passwordcheck">Повторіть пароль</label>
          <input
            type="password"
            name="passwordcheck"
            id="passwordcheck"
            required
            placeholder="Повторіть пароль"
            maxLength="24"
          />

          <input type="submit" name="submit" id="bth-submit" value="Створити акаунт" />
          <p>Продовжуючи, ви погоджуєтеся з Умовами використання та Повідомленням про конфіденційність Legion.</p>
        </form>
      </div>

      <h3 className="Accountinformation">Вже є акаунт?</h3>
      <button
        className="authentication"
        id="bth_auth"
      >
       <Link to="/log">Увійти акаунт в Legion?</Link>
      </button>
    </section>
  );
}
