import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import heroImage from '../assets/hero-bg.jpeg';
import DotsLoader from "./DotsLoader";
import "./Home.css";

export default function Home() {
    const [search, setSearching] = useState("");
    const [datas, setDatas] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [loading, setLoading] = useState(true);

    
    const BASE_URL =  "http://localhost:5000";
    

    // Fetch all posts on page load
    const fetchData = async () => {
        try {
            const res = await axios.get(`${BASE_URL}/fetch/read`);
            setDatas(res.data);
            setFilteredData(res.data); 
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    // Triggered only when Search button is clicked
    const handleSearch = () => {
        if (!search.trim()) {
            // If search is empty, show all posts
            setFilteredData(datas);
            return;
        }

        const lower = search.toLowerCase();
        const filtered = datas.filter(
            (data) =>
                data.title.toLowerCase().includes(lower) ||
                data.content.toLowerCase().includes(lower)
        );
        setFilteredData(filtered);
    };

    if (loading) return <DotsLoader />;

    return (
        <div>
            {/* Hero Section */}
            <div
                className="w-full h-screen bg-cover bg-center flex flex-col items-center justify-center text-white"
                style={{ backgroundImage: `url(${heroImage})` }}
            >
                <h1 className="heading text-center" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
                    Welcome to Logloop Blog
                </h1>
                <h3 className="subTitle text-center" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.5)" }}>
                    Explore Ideas & Stories
                </h3>

                <div className="mt-10 w-80 h-10 rounded-lg shadow-[0_4px_10px_rgba(0,0,0,0.5)] bg-white flex items-center justify-between md:w-100">
                    <input
                        className="w-60 md:w-70 h-10 p-2 px-5 text-lg outline-none focus:outline-none text-[rgb(62,62,62)]"
                        type="text"
                        placeholder="Search something..."
                        value={search}
                        onChange={(e) => setSearching(e.target.value)}
                    />
                    <button
                        className="w-20 md:w-23 h-10 rounded-tr-lg rounded-br-lg border-black bg-black text-xl text-white"
                        onClick={handleSearch}
                    >
                        Search
                    </button>
                </div>
            </div>

            <div className="bg-gray-50 p-20 w-full flex relative justify-center items-start">
                <div className="w-250 flex gap-8 flex-wrap ">
                    {filteredData.length > 0 ? (
                        filteredData.map((data) => (
                            <div key={data.id} className="relative mb-5 border-gray-200 border flex flex-col justify-between w-67 h-95 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl">
                                <div className="h-30 w-full">
                                    <img
                                        className="h-full w-full object-cover"
                                        src={`${BASE_URL}/uploads/${data.photo_url}`}  // ✅ used BASE_URL here
                                    />
                                </div>
                                <div className="flex flex-col h-60 w-full gap-2 px-6">
                                    <h1 className="font-bold text-center text-lg">
                                        {data.content.length > 30 ? data.content.slice(0, 30) + "..." : data.content}
                                    </h1>
                                    <p className="text-gray-500 text-center mb-2">
                                        {new Date(data.created_at).toLocaleDateString()}
                                    </p>
                                    <p className="text-justify">
                                        {data.content.length > 60 ? data.content.slice(0, 60) + "..." : data.content}
                                    </p>
                                    <Link to={`/post/${data.id}`}>
                                        <button className="border-1 absolute bottom-3 w-55 bg-black p-2 text-white rounded-4xl">
                                            Read More
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center text-xl w-full mt-20">
                            No posts found for "{search}"
                        </p>
                    )}
                </div>

                {/* Sidebar */}
                <div className="hidden md:flex flex-col w-72 gap-6 sticky top-20 right-10">
                    <div className="border border-gray-200 px-6 py-5 flex flex-col gap-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl">
                        <h1 className="font-bold text-2xl">Popular Post</h1>
                        <p className="text-justify">
                            Small, consistent habits make the difference.
                        </p>
                    </div>

                    <div className="border border-gray-200 px-6 py-5 flex flex-col gap-5 bg-white rounded-2xl shadow-lg hover:shadow-2xl mt-6">
                        <h1 className="font-bold text-2xl">Categories</h1>
                        <ul>
                            <li>Tech</li>
                            <li>Life</li>
                            <li>Design</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}