import React from "react";
import { useParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import Spinner from "../components/Spinner/Spinner";
import ErrorElement from "../components/ErrorElement/ErrorElement";
import noImage from "../assets/images/no-image.jpg";
import { selectImageURL } from "../store/movieSlice";
import { useSelector } from "react-redux";
import { compareDesc, format, formatDistanceStrict } from "date-fns";
import StarredInCard from "../components/StarredInCard/StarredInCard";
import Gallery from "../components/Gallery/Gallery";

const PersonDetail = ({ title, detailText }) => {
  return (
    <div className="w-full flex justify-between gap-4">
      <p className="flex-1 text-neutral-400">{title}</p>
      <p className="flex-1 text-white">{detailText}</p>
    </div>
  );
};

const Person = () => {
  const imageUrl = useSelector(selectImageURL);
  const params = useParams();
  const id = params?.id;
  const { data, loading, error } = useFetch(`/person/${id}`);
  const { data: creditsData, loading: creditsLoading } = useFetch(
    `/person/${id}/combined_credits`
  );
  const { data: imageData } = useFetch(`/person/${id}/images`);

  const starredIn = creditsData?.cast
    ?.filter(
      (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
    )
    .sort((a, b) =>
      compareDesc(
        new Date(a.release_date || a.first_air_date),
        new Date(b.release_date || b.first_air_date)
      )
    );

  const workedOn = creditsData?.crew
    ?.filter(
      (obj, index, self) => index === self.findIndex((o) => o.id === obj.id)
    )
    .sort((a, b) =>
      compareDesc(
        new Date(a.release_date || a.first_air_date),
        new Date(b.release_date || b.first_air_date)
      )
    );

  if (loading || creditsLoading)
    return (
      <div className="fixed size-fit m-auto left-0 right-0 top-0 bottom-0 scale-[2]">
        <Spinner />
      </div>
    );

  if (error) return <ErrorElement errorText={error} />;
  if (data && creditsData)
    return (
      <section className="lg:pt-24 pb-8">
        <div className="container justify-center mx-auto px-3 py-16 lg:py-0 flex flex-col lg:flex-row gap-10">
          <div className="relative mx-auto w-fit lg:mx-0">
            <img
              src={data.profile_path ? imageUrl + data.profile_path : noImage}
              alt={data.name}
              className="w-60 object-cover rounded-lg"
            />
          </div>
          <div className="flex flex-col w-full mt-2 gap-4">
            <h2 className="text-xl lg:text-3xl font-bold text-white">
              {data.name}
            </h2>
            <div className="flex flex-col gap-1 max-w-lg">
              <h3 className="text-xl lg:text-2xl font-semibold text-white">
                About
              </h3>
              <PersonDetail
                title={"Known for"}
                detailText={data.known_for_department}
              />
              {data.birthday && (
                <PersonDetail
                  title={"Date of birth"}
                  detailText={`${format(
                    new Date(data.birthday),
                    "MMMM do yyyy"
                  )}, ${formatDistanceStrict(
                    Date.now(),
                    new Date(data.birthday),
                    "yyyy"
                  )}`}
                />
              )}
              <PersonDetail
                title={"Place of birth"}
                detailText={data.place_of_birth}
              />
              {data.deathday && (
                <PersonDetail
                  title={"Date of death"}
                  detailText={format(new Date(data.deathday), "MMMM do yyyy")}
                />
              )}
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-xl lg:text-2xl font-semibold text-white">
                Biography
              </h3>
              <p>{data.biography}</p>
            </div>
          </div>
        </div>

        <Gallery id={id} type={"person"} />

        {starredIn.length > 0 && (
          <div className="container mx-auto lg:mt-12 flex flex-col gap-4">
            <h3 className="text-xl lg:text-2xl font-semibold text-white text-center">
              Starred in:
            </h3>
            <div className="grid grid-cols-[repeat(auto-fit,320px)]  gap-8 px-2 lg:px-8 justify-evenly">
              {starredIn.map((item) => (
                <StarredInCard
                  data={item}
                  type={item.media_type}
                  key={item.id}
                />
              ))}
            </div>
          </div>
        )}
        {workedOn.length > 0 && (
          <div className="container mx-auto lg:mt-12 flex flex-col gap-4">
            <h3 className="text-xl lg:text-2xl font-semibold text-white text-center">
              Worked on:
            </h3>
            <div className="grid grid-cols-[repeat(auto-fit,320px)]  gap-8 px-2 lg:px-8 justify-evenly">
              {workedOn.map((item) => (
                <StarredInCard
                  data={item}
                  type={item.media_type}
                  key={item.id}
                />
              ))}
            </div>
          </div>
        )}
      </section>
    );
};

export default Person;
