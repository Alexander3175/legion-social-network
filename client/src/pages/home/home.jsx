import Aside from "../../components/Aside/Aside";
import { observer } from "mobx-react-lite";
import Post from "../../components/post/post";
import './home.scss';

function Home() {


  return (
    <>
     <div className="wrapper">
     <Aside />
     <Post />
     </div>
    </>
  );
}

const ObservedHome = observer(Home);

export default ObservedHome;
