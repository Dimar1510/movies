import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import HorizontalScroll from "../HorizontalScroll/HorizontalScroll";
import isMediaType from "../utils/isMediaType";

const Recommendations = () => {
  const params = useParams();
  const type = params.explore;
  const { data } = useFetch(`/${type}/${params?.id}/recommendations`);

  if (data && Array.isArray(data) && data.length > 0 && isMediaType(type))
    return (
      <HorizontalScroll
        sectionData={data}
        heading={"Recommendations"}
        type={type}
      />
    );
};

export default Recommendations;
