const Shimmer = () => {
  return (
    <div className="shimmer-container">
      <div className="body ">
        <div className="dynamic-ui flex justify-between ">
          <div className="search-container m-2 p-4  bg-gray-200 my-2 flex justify-start rounded-xl">
            <input
              type="text"
              className="search-box  rounded-xl p-2 m-1"
              placeholder="  Search"
              value=""
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
            <button
              className=" search-button m-2 p-1 hover:bg-gray-200 bg-white  rounded-2xl "
              onClick={(e) => {
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
          <div className=" top-rated p-3 flex justify-end">
            <button
              className="filter-btn px-4 py-2 rounded-xl shadow-lg bg-blue-100"
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
        <div className="flex flex-wrap">
          {Array(20)
            .fill("")
            .map((e, index) => (
              <div
                key={index}
                className="shimmer-card m-4 p-4 w-60 rounded-md shadow-lg h-96 bg-gray-100"
              ></div>
            ))}
        </div>
      </div>
    </div>
  );
};
export default Shimmer;
