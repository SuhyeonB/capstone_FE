import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Signin from "./pages/signin";
import Signup from "./pages/signup";

import Editprofile from "./pages/Editprofile";

import CreateDiary from "./pages/createDiary/CreateDiary";

import ScrollToTop from "./utils/ScrollTolTop";

function App() {
  return (
    <div>
      <BrowserRouter>
          <Header/>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Main/>}/>
            <Route path='/signin' element={<Signin/>}/>
            <Route path='/signup' element={<Signup/>}/>

            {/* nav */}
            <Route path='/writediary' element={<CreateDiary/>} />

            <Route path='/editprofile' element={<Editprofile/>} />
          </Routes>
          <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
