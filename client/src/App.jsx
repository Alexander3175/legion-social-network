import {Routes, Route} from 'react-router-dom';
import Home from './pages/home/home';
import AuthReg from './pages/auth/reg/Registration';
import AuthLogin from './pages/auth/login/LoginUser';
import Profile from './pages/profile/profile';

import "./index.scss";

export default function App() {



return (
  <Routes>
    <Route path="/" element={<Home />}/>
    <Route path="/reg" element={<AuthReg />}/>
    <Route path="/login" element={<AuthLogin />}/>
    <Route path="/profile" element={<Profile />}/>

  </Routes>
);
};
//<Route path="*" element={<NotFound />}/>