import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";

import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";

import ScrollToTop from "./utils/ScrollTolTop";

function App() {
  return (
    <div>
      <BrowserRouter>
          <Header/>
          <ScrollToTop />
          <Routes>
            <Route path='/' element={<Main/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
    </div>
  );
}

export default App;
