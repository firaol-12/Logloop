import React, { useState } from "react";
import loginImg from "../assets/login (2).jpeg";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    // ✅ Base URL variable
      const BASE_URL = "http://localhost:5000";


    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${BASE_URL}/auth/login`, {
                email,
                password,
            });
            localStorage.setItem("token", res.data.token);
            alert(res.data.message);
            setEmail("");
            setPassword("");
            navigate("/");
        } catch (error) {
            console.error("Login error:", error);
            alert("Please check your email and password ⚠️");
        }
    };

    return (
        <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
            <div className="flex justify-center flex-col w-80 h-135 items-center bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.5)] md:flex-row md:w-170 md:h-90">
                <div className="w-60 h-65 md:w-85 md:h-80">
                    <img src={loginImg} alt="login" />
                </div> 
                <div className="w-85 h-full">
                    <form onSubmit={handleLogin} className="flex flex-col justify-center p-5 gap-5">
                        <h1 className="bold text-center text-xl md:mb-3 md:mt-2 register-heading">Login</h1>
                        <input
                            className="px-3 py-2 border rounded-4xl border-gray-400" 
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="px-3 py-2 border rounded-4xl border-gray-400"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="px-3 py-2 border rounded-4xl border-gray-400 bg-black text-white">
                            Login
                        </button>
                    </form>
                </div>     
            </div>
        </div>
    );
}