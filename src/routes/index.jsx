import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Details from "../pages/Details";
import Explore from "../pages/Explore";
import Search from "../pages/Search";
import Person from "../pages/Person";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: ":explore",
        element: <Explore />,
      },
      {
        path: ":explore/:id",
        element: <Details />,
      },
      {
        path: "search",
        element: <Search />,
      },
      { path: "person/:id", element: <Person /> },
    ],
  },
]);

export default router;
