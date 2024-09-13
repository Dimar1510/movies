import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MobileNav from "./components/MobileNav/MobileNav";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setImageURL, setSearchInput } from "./store/movieSlice";
import { useFetchConfig } from "./hooks/useFetchConfig";

const App = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  const { data, error } = useFetchConfig();

  useEffect(() => {
    if (data) {
      dispatch(setImageURL(data + "original"));
    }
  }, [data]);

  useEffect(() => {
    if (location.pathname !== "/search") {
      dispatch(setSearchInput(""));
    }
  }, [location.pathname]);

  if (error)
    return (
      <div className="pt-16">
        Error loading data, something went wrong with API. Please try again
        later.
      </div>
    );

  return (
    <main className="pb-14 lg:pb-0 flex flex-col min-h-svh">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      <MobileNav />
    </main>
  );
};

export default App;
