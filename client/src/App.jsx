import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/home";
import RegistrationUser from "./pages/auth/reg/Registration";
import LoginUser from "./pages/auth/login/LoginUser";
import Profile from "./pages/profile/profile";

import "./index.scss";
import { useContext, useEffect, useState } from "react";
import { Context } from "./context.js";
import { observer } from "mobx-react-lite";

function App() {
  
  const { store } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Token......");
    if (localStorage.getItem("token")) {
      store.checkAuth().finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [store]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!store.isAuth) {
    return (
      <Routes>
        <Route path="/login" element={<LoginUser />} />
        <Route path="/registration" element={<RegistrationUser />} />
        <Route path="*" element={<LoginUser />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
const ObservedApp = observer(App);
export default ObservedApp;
//<Route path="*" element={<NotFound />}/>
