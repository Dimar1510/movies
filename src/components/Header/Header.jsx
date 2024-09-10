import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import userIcon from "../../assets/images/user.png";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "../navigation";

const Header = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <header className="fixed top-0 w-full h-16 bg-neutral-600 bg-opacity-75 z-50">
      <div className="container mx-auto px-3 flex items-center h-full">
        <NavLink to={"/"}>
          <img src={logo} alt="logo" width={120} />
        </NavLink>
        <nav className="hidden lg:flex items-center gap-2 ml-5">
          {navigation.map((nav) => (
            <NavLink
              key={nav.href}
              to={nav.href}
              className={({ isActive }) =>
                `px-2 hover:text-neutral-100 ${isActive && "text-neutral-100"}`
              }
            >
              {nav.label}
            </NavLink>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-5">
          <form
            className="hidden lg:flex items-center gap-2"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent px-1 outline-none border-none"
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
            <button className="text-2xl text-white">
              <IoSearchOutline />
            </button>
          </form>

          <button className="active:scale-75 transition-transform">
            <img src={userIcon} alt="" className="w-8 h-8 rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
