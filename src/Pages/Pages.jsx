import Group from "../views/Group";
import Home from "../views/Home";
import { Route, Routes } from "react-router-dom";
import HeaderNav from "../Components/Header";
import Notfound from "../views/notfound";
const Pages = () => {
  return (
    <>
      <HeaderNav />
      <div className="page-body">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/group/:id" element={<Group />} />
          <Route from="*" path="/notfound" element={<Notfound />} />
        </Routes>
      </div>
    </>
  );
};

export default Pages;
