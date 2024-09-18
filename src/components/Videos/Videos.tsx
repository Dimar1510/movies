import { useParams } from "react-router-dom";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
import { useFetch } from "../../hooks/useFetch";
import isMediaType from "../utils/isMediaType";

const Videos = ({ itemId }: { itemId: string }) => {
  const params = useParams();
  const type = params.explore;
  const { data } = useFetch(`/${type}/${itemId}/videos`);

  if (data && Array.isArray(data) && data.length > 0 && isMediaType(type))
    return (
      <HorizontalScroll
        sectionData={data}
        heading={"Videos"}
        type={type}
        isVideo={true}
      />
    );
};

export default Videos;
