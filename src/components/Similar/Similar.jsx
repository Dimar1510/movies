import React from "react";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";

const Similar = () => {
  const params = useParams();
  const type = params.explore;
  const { data } = useFetch(`/${type}/${params?.id}/similar`);

  if (data)
    return (
      <HorizontalScroll
        sectionData={data}
        heading={type === "tv" ? "Similar TV Shows" : "Similar Movies"}
        type={type}
      />
    );
};

export default Similar;
