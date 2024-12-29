// import React, { useState, useEffect } from "react";

// const Alert = ({ message, type = "success", duration = 2000, onClose }) => {
//     const [isVisible, setIsVisible] = useState(true);
//     useEffect(() => {
//         const timer = setTimeout(() => {
//             setIsVisible(false);
//         }, duration);
//         return () => clearTimeout(timer);
//     }, [duration, onClose]);

//     return (
//         <div
//             className={`flex items-center p-4 mb-4 text-sm rounded-lg fixed top-4 right-4 z-50
//         ${isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-4 scale-95"}
//         transition-all duration-500 ease-in-out
//         ${type === "success" ? "bg-green-50 text-green-800 dark:bg-gray-800 dark:text-green-400" : "bg-red-50 text-red-800 dark:bg-gray-800 dark:text-red-400"}`}
//         >
//             <svg
//                 className="flex-shrink-0 inline w-10 h-10 me-3"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//             >
//                 <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
//             </svg>
//             <span className="sr-only">Info</span>
//             <div>
//                 <span className="font-medium">{type === "success" ? "Success alert!" : "Error alert!"}</span> {message}
//             </div>
//         </div>
//     );
// };

// export default Alert;
