import Aside from "../../components/Aside/Aside";
import { useContext, useState } from "react";
import { Context } from "../../context.js";
import { observer } from "mobx-react-lite";
import userService from "../../services/userService.js";

function Home() {
  const { store } = useContext(Context);
  const [user, setUser] = useState([]);

  async function getUser() {
    try {
      const response = await userService.fetchUsers();
      console.log(response);
      setUser(response);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <Aside />
      <h1>
        {store.isAuth
          ? `Користувач Авторизований ${store.user?.email || "NO EMAIL"}`
          : "Не зареєстрований"}
      </h1>
      <button onClick={() => store.logout()}>LOGOUT</button>
      <button onClick={() => getUser()}>GETUSER</button>

      {Array.isArray(user) && user.length > 0 ? (
        user.map((user, index) => (
          <div key={index}>
            {user.name}-{user.email}
          </div>
        ))
      ) : (
        <p>Користувачі не знайдені</p>
      )}
    </div>
  );
}

const ObservedHome = observer(Home);

export default ObservedHome;
