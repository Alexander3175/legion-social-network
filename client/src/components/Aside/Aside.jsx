import { Link } from "react-router-dom";
import Search from "../search/Search";
import "./AsideStyle.scss";
import { useState } from "react";
export default function Aside() {
  const [isOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
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
                <div className="svg-navigation"></div>
                <Link to="/">Головна</Link>
              </li>
              <li>
                <div className="svg-search"></div>
                <a href="#" onClick={openModal}>
                  Пошук
                </a>
              </li>
              <li>
                <div className="svg-message"></div>
                <a href="#">Повідомлення</a>
              </li>
            </ul>
          </div>
          <div className="personal">
            <div className="profile">
            <div className="svg-profile"></div>
              <Link to="/profile">Профіль</Link>
            </div>
            <div className="more">
              <Link to="/profile">Більше</Link>
            </div>
          </div>
        </div>
      </div>
      
      <Search isOpen={isOpen} closeModal={closeModal} />
    </aside>
  );
}
