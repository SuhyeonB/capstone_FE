import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Signin from "./pages/signin";
import Signup from "./pages/signup";

import Mypage from "./pages/Mypage";

import CreateDiary from "./pages/createDiary/CreateDiary";

import Diaryboard from "./pages/createDiary/Diaryboard";
import MyDiaryboard from "./pages/createDiary/MyDiaryboard";

import DiaryDetail from "./pages/createDiary/DiaryDetail";

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

            <Route path='/board' element={<Diaryboard/>} />
            <Route path='/diary' element={<MyDiaryboard/>} />

            <Route path="/diary/:postId" element={<DiaryDetail />} />
            
            <Route path='/mypage' element={<Mypage/>} />
          </Routes>
          <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
