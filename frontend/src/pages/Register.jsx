import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import registerImg from "../assets/register.jpeg";
import "./Register.css";

export default function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const navigate = useNavigate();

    // ✅ Base URL variable
      const BASE_URL = "http://localhost:5000";


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            console.log("Sending register request...");
            const res = await axios.post(`${BASE_URL}/auth/register`, {
                username,
                email,
                password,
            });
            console.log("Response:", res.data);
            localStorage.setItem("token", res.data.token);
            alert(res.data.message);
            setUsername("");
            setEmail("");
            setPassword("");
            navigate("/");
        } catch (error) {
            console.error("Register error:", error);
            alert("Registration failed, please try again.");
        }
    };

    return (
        <div className="w-full h-screen bg-gray-100 flex justify-center items-center">
            <div className="flex justify-center flex-col w-80 h-150 items-center bg-white rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.5)] md:flex-row md:w-170 md:h-90">
                <div className="w-60 h-65 md:w-85 md:h-80">
                    <img src={registerImg} alt="register" />
                </div>
                <div className="w-85 h-full">
                    <form onSubmit={handleRegister} className="flex flex-col justify-center p-5 gap-3">
                        <h1 className="bold text-center text-xl md:mb-3 md:mt-2 register-heading">Registration</h1>
                        <input
                            className="px-3 py-2 border rounded-4xl border-gray-400" 
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            className="px-3 py-2 border rounded-4xl border-gray-400" 
                            type="email"
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
                        <button 
                            type="submit" 
                            className="px-3 py-2 border rounded-4xl border-gray-400 bg-black text-white"
                        >
                            Register
                        </button>
                        <span className="text-center text-gray-700">
                            Already have an account?{" "}
                            <Link to="/login" className="hover:underline text-blue-600">Login</Link>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    );
}