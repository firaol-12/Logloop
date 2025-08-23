import React from "react";

export default function DotsLoader() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="flex space-x-2">
        <span className="dot bg-black w-6 h-6 rounded-full animate-bounce"></span>
        <span className="dot bg-black w-6 h-6 rounded-full animate-bounce delay-200"></span>
        <span className="dot bg-black w-6 h-6 rounded-full animate-bounce"></span>
        <span className="dot bg-black w-6 h-6 rounded-full animate-bounce delay-400"></span>    
      </div>

      <style>{`
        .animate-bounce {
          animation: bounce 0.6s infinite alternate;
        }
        .delay-200 { animation-delay: 0.2s; }
        .delay-400 { animation-delay: 0.4s; }
        @keyframes bounce {
          0% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-15px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
