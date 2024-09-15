import React from "react";
import { useParams } from "react-router-dom";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
import { useFetch } from "../../hooks/useFetch";

const Videos = ({ itemId }) => {
  const params = useParams();
  const type = params.explore;
  const { data: videoData } = useFetch(`/${type}/${itemId}/videos`);

  if (videoData && videoData.length > 0)
    return (
      <HorizontalScroll
        sectionData={videoData}
        heading={"Videos"}
        type={type}
        isVideo={true}
      />
    );
};

export default Videos;
