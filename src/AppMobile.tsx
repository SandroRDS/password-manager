import { Routes, Route } from "react-router-dom";
import Logon from './pages/Logon';
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

function AppMobile() {
  return (
    <Routes>
      <Route path="/" element={ <Logon /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/home" element={ <Home /> } />
      <Route path="*" element={ <NotFound /> } />
    </Routes>
  );
}

export default AppMobile;
