import  { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

const nav: object[] = [
  {
    id: 1,
    href: "/",
    text: "Home",
  },
  {
    id: 2,
    href: "/about",
    text: "About",
  },
  {
    id: 3,
    href: "/libary",
    text: "Libary",
  },
];

function Header() {
  const [active, setActive] = useState<number>(1);
  const navigate = useNavigate();
  return (
    <header className="container flex justify-between w-full py-3 items-center px-8 bg-sky-100 border-b border-b-slate-200">
      <a href="" className="text-[26px] font-medium">Library</a>
      <ul className="flex gap-[80px]">
        {nav.map((e: any) => (
          <li key={e.id}>
            <Link to={e.href}>
              <span
                onClick={() => setActive(e.id)}
                className={`font-[300] ${active === e.id ? "active" : ""}`}
              >
                {e.text}
              </span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/signUp")}
          className="bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white  px-4 py-2 rounded-[10px]"
        >
          Sign Up
        </button>
        <button
          onClick={() => navigate("/signIn")}
          className="bg-white border-2 border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white  px-4 py-2 rounded-[10px]"
        >
          Log In
        </button>
      </div>
    </header>
  );
}

export default Header;
