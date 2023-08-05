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

  console.log(listOfRestaurants);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      " https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.6304203&lng=77.21772159999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
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
        <div className="dynamic-ui flex justify-between ">
          <div className="search-container m-2 p-4  bg-gray-200 my-2 flex justify-start rounded-xl">
            <input
              type="text"
              className="search-box  rounded-xl p-2 m-1"
              placeholder="  Search"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <button
              className=" search-button m-2 p-1 hover:bg-gray-200 bg-white  rounded-2xl "
              onClick={(e) => {
                //filter the restarant card
                //console.log(searchText);
                const filteredRestaurant = filteredRestaurants?.filter((res) =>
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
          <div className=" top-rated p-3 flex justify-end">
            <button
              className="filter-btn m-2 p-2 rounded-xl shadow-lg bg-blue-100"
              onClick={() => {
                //filter logic here for top rated restaurant.
                const filteredList = filteredRestaurants.filter(
                  (res) => res.info.avgRating > 4.1
                );
                setFilteredRestaurants(filteredList);
              }}
            >
              Top Rated Restaurant
            </button>
          </div>
        </div>

        {/* <div className="res-container flex flex-wrap ">
          {filteredRestaurants.map((restaurant) => (
            <Link to={"/restaurants/" + restaurant.info?.id}>
              <RestaurantCard key={restaurant.info?.id} resData={restaurant} />
            </Link>
          ))}
        </div> */}
        <div className="res-container flex flex-wrap">
          {filteredRestaurants?.map((restaurant) => {
            return (
              <Link to={"/restaurants/" + restaurant?.info?.id}>
                <RestaurantCard
                  key={restaurant?.info?.id}
                  resData={restaurant}
                />
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default Body;
