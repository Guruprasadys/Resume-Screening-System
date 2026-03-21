import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="backdrop-blur-md bg-gradient-to-r from-purple-700 to-indigo-800 text-white px-10 py-4 shadow-xl rounded-b-2xl flex items-center justify-between border-b border-white/10">
      
      {/* Logo / Title */}
      <h1 className="font-extrabold text-2xl tracking-wide drop-shadow-md">
        Decentralized Resume Screening
      </h1>

      {/* Links */}
      <div className="flex gap-10">
        {[
          { name: "Dashboard", to: "/" },
          { name: "Login", to: "/login" },
          { name: "Register", to: "/register" },
        ].map((item) => (
          <Link
            key={item.name}
            to={item.to}
            className="
              relative 
              font-semibold 
              transition-all 
              duration-300 
              hover:text-yellow-300 
              hover:scale-110
            "
          >
            {item.name}

            {/* Animated Underline */}
            <span
              className="
                absolute left-0 -bottom-1 w-0 h-[2px] 
                bg-yellow-300 transition-all duration-300 
                hover:w-full
              "
            ></span>
          </Link>
        ))}
      </div>

    </nav>
  );
}
