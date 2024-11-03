import Aside from "../../components/Aside/Aside";
import ProfileUser from "./components/ProfileUser";


import "../../index.scss";
import "./style.scss";

export default function Profile() {
  return (
    <div className="conteiner">
      <Aside />
      <ProfileUser />
    </div>
  );
}
