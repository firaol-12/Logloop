import React from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Write from "./pages/Write";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Footer from "./components/Footer";
import Post from "./pages/Post";

export default function App(){
    return(
        <Router>
            <Navbar />
            {/* <Post /> */}
            <Routes> 
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/post/:id" element={<Post />} />
                <Route path="/write" element={<Write />} />
            </Routes>
            <Footer />
        </Router>
    )
}
