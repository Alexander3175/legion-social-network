import Aside from "../../components/Aside/Aside";
import ProfileUser from "./components/ProfileUser/ProfileUser";
import Content from "./components/contentProfile/contentProfile";

import "../../index.scss";
import "./style.scss";

export default function Profile() {
  return (
    <div className="conteiner">
      <Aside />
      <ProfileUser />
      <Content />
    </div>
  );
}
