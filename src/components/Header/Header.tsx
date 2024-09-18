import { useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { IoClose, IoSearchOutline } from "react-icons/io5";
import { navigation } from "../utils/navigation";
import { selectSearchInput, setSearchInput } from "../../store/movieSlice";
import SearchInput from "../SearchInput/SearchInput";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const searchInput = useAppSelector(selectSearchInput);

  useEffect(() => {
    if (searchInput === "" && location.pathname === "/search") {
      const delayedClear = setTimeout(() => {
        navigate("/search");
      }, 100);
      return () => clearTimeout(delayedClear);
    } else if (searchInput !== "") {
      const delayedFetch = setTimeout(() => {
        navigate(`/search?q=${searchInput}`);
      }, 750);
      return () => clearTimeout(delayedFetch);
    }
  }, [searchInput]);

  return (
    <header className="hidden lg:block fixed top-0 w-full h-16 bg-black bg-opacity-90 z-50">
      <div className="container mx-auto px-3 flex items-center h-full">
        <NavLink to={"/"}>
          <h1 className="site-logo text-3xl bg-gradient-to-r from-themeColor to-yellow-400 bg-clip-text text-transparent font-bold">
            <span className="font-extrabold">KИHO</span>
            <span className="font-sans font-extrabold">N</span>
            <span>ERD</span>
          </h1>
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
          <div className="hidden lg:flex items-center gap-2 border border-neutral-700 py-0.5 px-1 rounded">
            <SearchInput isHeader={true} />
            {searchInput.length === 0 ? (
              <label htmlFor="search-input" className="text-2xl text-white">
                <IoSearchOutline />
              </label>
            ) : (
              <button
                onClick={() => dispatch(setSearchInput(""))}
                className="text-2xl"
              >
                <IoClose />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
