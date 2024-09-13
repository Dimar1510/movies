import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";

const Recommendations = () => {
  const params = useParams();
  const type = params.explore;
  const { data } = useFetch(`/${type}/${params?.id}/recommendations`);

  if (data && data.length > 0)
    return (
      <HorizontalScroll
        sectionData={data}
        heading={"Recommendations"}
        type={type}
      />
    );
};

export default Recommendations;
