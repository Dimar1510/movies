import React, { useEffect, useState } from "react";
import logo from "../../assets/images/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import userIcon from "../../assets/images/user.png";
import { IoSearchOutline } from "react-icons/io5";
import { navigation } from "../utils/navigation";
import { useDispatch, useSelector } from "react-redux";
import { selectSearchInput, setSearchInput } from "../../store/movieSlice";
import SearchInput from "../SearchInput/SearchInput";

const Header = () => {
  const navigate = useNavigate();
  const searchInput = useSelector(selectSearchInput);

  useEffect(() => {
    if (searchInput) {
      navigate(`/search?q=${searchInput}`);
    }
  }, [searchInput]);

  return (
    <header className="fixed top-0 w-full h-16 bg-black bg-opacity-90 z-50">
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
          <div className="hidden lg:flex items-center gap-2">
            <SearchInput />
            <label htmlFor="search-input" className="text-2xl text-white">
              <IoSearchOutline />
            </label>
          </div>

          <button className="active:scale-75 transition-transform">
            <img src={userIcon} alt="" className="w-8 h-8 rounded-full" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
