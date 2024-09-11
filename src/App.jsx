import { Outlet } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MobileNav from "./components/MobileNav/MobileNav";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setImageURL } from "./store/movieSlice";

const App = () => {
  const dispatch = useDispatch();

  const fetchConfig = async () => {
    try {
      const response = await axios.get("/configuration");
      dispatch(setImageURL(response.data.images.secure_base_url + "original"));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConfig();
  }, []);

  return (
    <main className="pb-14 lg:pb-0">
      <Header />
      <div>
        <Outlet />
      </div>
      <Footer />
      <MobileNav />
    </main>
  );
};

export default App;
