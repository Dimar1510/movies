import { MediaType } from "../../store/types";

const isMediaType = (value: any): value is MediaType => {
  return value === "tv" || value === "movie" || value === "person";
};

export default isMediaType;
