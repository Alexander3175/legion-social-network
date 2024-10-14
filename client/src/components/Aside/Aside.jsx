import { Link } from "react-router-dom";
import "./AsideStyle.scss";
export default function Aside() {
  return (
    <aside className="wrapperAside">
      <div className="asideConteiner">
        <div className="asideContent">
          <div className="title">
            <h1>Legion</h1>
          </div>
          <div className="navigation">
            <ul className="navigationList">
              <li>
                <div className="svg-navigation">d1</div>
                <a href="#">Головна</a>
              </li>
              <li>
                <div className="svg-navigation">d2</div>
                <a href="#">Пошук</a>
              </li>
              <li>
                <div className="svg-navigation">d3</div>
                <a href="#">Повідомлення</a>
              </li>
            </ul>
          </div>
          <div className="personal">
            <div className="profile">
              <Link to="/reg">Профіль</Link>
            </div>
            <div className="more">
              <a>Більше</a>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}
