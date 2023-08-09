import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyBio from "../MyBio/MyBio";
import EditMyBio from "../EditMyBio/EditMyBio";
import SkillEditSection from "../SkillEdit/SkillEditSection";

const RouterComponent = () =>{
    return(
        <div>
          <Router>
            <Routes>
                <Route path='/' element={<MyBio />} />
                <Route path='/editBio' element={<EditMyBio />} />
                <Route path='/skillEdit' element={<SkillEditSection />} />
            </Routes>
          </Router>
        </div>
    )
}
export default RouterComponent