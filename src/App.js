import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Signin from "./pages/signin";
import Signup from "./pages/signup";
import FindPassword from "./pages/FindPassword";

import Mypage from "./pages/Mypage";

import CreateDiary from "./pages/diary/CreateDiary";

import Diaryboard from "./pages/diary/Diaryboard";
import MyDiaryboard from "./pages/diary/MyDiaryboard";

import DiaryDetail from "./pages/diary/DiaryDetail";
import MyDiaryDetail from "./pages/diary/MyDiaryDetail";

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
            <Route path='/findpassword' element={<FindPassword/>}/>
            
            {/* nav */}
            <Route path='/writediary' element={<CreateDiary/>} />

            <Route path='/board' element={<Diaryboard/>} />
            <Route path='/diary' element={<MyDiaryboard/>} />

            <Route path="/diary/:postId" element={<MyDiaryDetail />} />
            <Route path="/board/:postId" element={<DiaryDetail />} />
            
            <Route path='/mypage' element={<Mypage/>} />
          </Routes>
          <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
