import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Signin from "./pages/signin";
import Signup from "./pages/signup";
import FindPassword from "./pages/ResetPassword";

import Mypage from "./pages/Mypage";

import CreateDiary from "./pages/CreateDiary/CreateDiary";

import Diaryboard from "./pages/diary/Diaryboard";
import MyDiaryboard from "./pages/diary/MyDiaryboard";

import DiaryDetail from "./pages/diary/DiaryDetail";
import MyDiaryDetail from "./pages/diary/MyDiaryDetail";

import ScrollToTop from "./utils/ScrollTolTop";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
            <Header />
            <ScrollToTop />
            <Routes>
                {/* Public Routes */}
                <Route path='/' element={<Main />} />
                <Route path='/signin' element={<Signin />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/findpassword' element={<FindPassword />} />

                {/* Protected Routes */}
                <Route
                    path='/writediary'
                    element={
                        <ProtectedRoute>
                            <CreateDiary />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/diary'
                    element={
                        <ProtectedRoute>
                            <MyDiaryboard />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/diary/:postId'
                    element={
                        <ProtectedRoute>
                            <MyDiaryDetail />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/mypage'
                    element={
                        <ProtectedRoute>
                            <Mypage />
                        </ProtectedRoute>
                    }
                />

                {/* Public Routes */}
                <Route path='/board' element={<Diaryboard />} />
                <Route path='/board/:postId' element={<DiaryDetail />} />
            </Routes>
            <Footer />
        </BrowserRouter>
    </div>
  );
}

export default App;
