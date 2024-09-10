import { AiOutlineHome } from "react-icons/ai";
import { FiTv } from "react-icons/fi";
import { BiSolidMovie } from "react-icons/bi";
import { IoSearchOutline } from "react-icons/io5";

export const navigation = [
  {
    label: "TV Shows",
    href: "tv",
    icon: <FiTv />,
  },
  {
    label: "Movies",
    href: "movie",
    icon: <BiSolidMovie />,
  },
];

export const mobileNavigation = [
  {
    label: "Home",
    href: "/",
    icon: <AiOutlineHome />,
  },
  ...navigation,
  {
    label: "Search",
    href: "/search",
    icon: <IoSearchOutline />,
  },
];
