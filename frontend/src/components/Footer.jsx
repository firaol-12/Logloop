import React from "react";

export default function Footer(){
    return(
        <div className="w-full flex justify-center relative">
            <footer className="absolute bottom-2 text-center text-gray-500">
                © {new Date().getFullYear()} Logloop -by Firaol Negash 
            </footer>
        </div>
    )
}