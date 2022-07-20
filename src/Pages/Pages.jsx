import React from "react"
import Group from "../views/Group"
import Home from "../views/Home"
import { Route, Routes } from "react-router-dom";
import Header from "../Components/Header";
import HeaderNav from "../Components/Header";
const Pages = () => {
    return (
        <>
            <HeaderNav />
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/group/:id' element={<Group />} />
            </Routes>
        </>
    )
}

export default Pages