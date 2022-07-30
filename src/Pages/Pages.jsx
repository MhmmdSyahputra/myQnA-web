import React from "react"
import Group from "../views/Group"
import Home from "../views/Home"
import { Route, Routes } from "react-router-dom";
import Header from "../Components/Header";
import HeaderNav from "../Components/Header";
import Footer from "../Components/Footer";
import Notfound from "../views/notfound";
const Pages = () => {
    return (
        <>
            <HeaderNav />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/group/:id' element={<Group />} />
                <Route from="*" path='/notfound' element={<Notfound />} />
            </Routes>
        </>
    )
}

export default Pages