import { CDN_URL } from "../utils/constants";

const RestaurantCard = (props) => {
  const { resData } = props;
  // destructuring data
  // const { cloudinaryImageId, name, cuisines, avgRating, costForTwo, sla } =
  //   resData?.info;
  const {
    name,
    cuisines,
    avgRating,
    costForTwo,
    areaName,
    sla,
    cloudinaryImageId,
  } = resData?.info;

  return (
    <div className="res-card m-4 p-4 w-60 rounded-md shadow-lg bg-gray-100 hover:bg-gray-200">
      <img
        className="res-logo rounded-sm"
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId}
      />
      <h3 className="font-bold py-2">{name}</h3>
      <h4 className="font-light py-2"> ⭐️ {avgRating} </h4>
      <h4 className="font-thin py-2">{cuisines.join(", ")}</h4>
      <h4 className="font-extralight py-2"> {areaName}</h4>
      <div className="flex items-center justify-between">
        <h4 className="font-extralight px-1 py-2"> {costForTwo}</h4>
        <h4 className="font-extralight px-1 py-2"> · {sla?.slaString} </h4>
      </div>
    </div>
  );
};

export default RestaurantCard;
