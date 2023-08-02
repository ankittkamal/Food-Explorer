import RestaurantCard from "./RestaurantCard";
import resList from "../utils/mockData";
import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () => {
  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6139391&lng=77.2090212&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const json = await data.json();
    //console.log(json);

    const restaurantData =
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants;

    setListOfRestaurants(restaurantData);
    setFilteredRestaurants(restaurantData);
  };
  const onlineStatus = useOnlineStatus();

  if (onlineStatus === false)
    return (
      <h1>‼️ Looks like you are offline, Please connect to internet 🌎 </h1>
    );

  return filteredRestaurants?.length === 0 ? (
    <Shimmer />
  ) : (
    <>
      <div className="body">
        <div className="filter dynamic-ui flex justify-between ">
          <div className="search m-4 p-4">
            <input
              type="text"
              className="search-box border border-solid border-black rounded-xl"
              placeholder="  Search"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            ></input>
            <button
              className=" search-button px-4 m-2  bg-slate-300 rounded-xl"
              onClick={() => {
                //filter the restarant card
                //console.log(searchText);
                const filteredRestaurant = listOfRestaurants.filter((res) =>
                  res.info?.name
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
                );

                setFilteredRestaurants(filteredRestaurant);
              }}
            >
              Search
            </button>
          </div>
          <div className=" top-rated m-4 p-4 flex items-center">
            <button
              className="filter-btn px-4 py-2 bg-gray-300 rounded-xl"
              onClick={() => {
                //filter logic here for top rated restaurant.
                const filteredList = listOfRestaurants.filter(
                  (res) => res.info.avgRating > 4.1
                );
                setFilteredRestaurants(filteredList);
              }}
            >
              Top Rated Restaurant
            </button>
          </div>
        </div>

        <div className="res-container flex flex-wrap ">
          {filteredRestaurants.map((restaurant) => (
            <Link to={"/restaurants/" + restaurant.info?.id}>
              <RestaurantCard key={restaurant.info?.id} resData={restaurant} />
            </Link>
          ))}
        </div>
      </div>
    </>
  );
};
export default Body;
