import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { CDN_URL, MENU_API } from "../utils/constants";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategories from "./RestaurantCategories";

const RestaurantMenu = () => {
  const { resId } = useParams();

  //const [showIndex, setShowIndex] = useState(null);

  const resInfo = useRestaurantMenu(resId);

  if (resInfo === null) return <Shimmer />;

  const {
    name,
    avgRating,
    cloudinaryImageId,
    areaName,
    sla,
    costForTwoMessage,
  } = resInfo?.cards[0]?.card?.card?.info;
  const { itemCards } =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card;

  // console.log(resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards);
  const cardCategories =
    resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
      (c) =>
        c.card?.["card"]?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  //console.log(cardCategories);

  return (
    <div className="Restaurant-details text-center">
      <div className="mx-auto w-60 m-4 rounded-lg shadow-lg bg-gray-100 ">
        <img
          className="res-logo rounded-lg"
          alt="res-logo"
          src={CDN_URL + cloudinaryImageId}
        />
        <h3 className="font-bold text-2xl">{name}</h3>

        <div className="font-extralight flex justify-center space-x-5">
          <div className="">{areaName} </div>
          <div>· {sla?.slaString}</div>
        </div>
      </div>

      <div className="Menu">
        {/* categories accordions */}
        {cardCategories.map((category, index) => (
          <RestaurantCategories
            key={category?.card?.card.title}
            data={category?.card?.card}
            //showItems={index === showIndex ? true : false}
            //setShowIndex={() => setShowIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};
export default RestaurantMenu;
