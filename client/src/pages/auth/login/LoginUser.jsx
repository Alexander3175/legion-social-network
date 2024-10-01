import { Link } from 'react-router-dom';
import "../styles/auth.scss";
export default function LoginUser(){
    return(
        <section className="auteficationSection">
        <h2 style={{fontSize: "2em"}}>Legion</h2>
        <div className="autefication-conteiner">
            <h2 style={{marginBottom: "80px"}}>Авторизація</h2>
            <form action="" className="auteficationForm" method="POST">


                <label htmlFor="userGmail">Email</label>
                <input type="email" name="userGmail" id="userGmail" required placeholder="Email" />

                <label htmlFor="userpassword">Пароль</label>
                <input type="password" name="userpassword" id="userpassword" required placeholder="Ваш пароль" />

                <input type="submit" name="submit" id="bth-submit" />
                <p>Продовжуючи, ви погоджуєтеся з Умовами використання та Повідомленням про конфіденційність Legion.</p>
            </form>
        </div>
        <h3 className="Accountinformation">Вже є аккаунт?</h3>
        <button className="authentication" id="bth_reg"><Link to="/reg">Створити акаунт в Legion?</Link></button>
    </section>
    )
}