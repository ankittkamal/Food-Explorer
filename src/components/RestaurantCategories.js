import { useState } from "react";
import ListItem from "./ListItem";

const RestaurantCategories = ({ data }) => {
  //console.log(data);

  const [showItems, setShowItems] = useState(true);

  const handleClick = () => {
    //console.log("clicked");
    setShowItems(!showItems);
    //setShowIndex();
  };

  return (
    <div>
      {/* header */}
      <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4 ">
        <div
          className="flex justify-between cursor-pointer"
          onClick={handleClick}
        >
          <span className="font-medium text-lg">
            {data.title} ({data.itemCards.length})
          </span>
          <span> ⌄ </span>
        </div>
        {/* acordian body */}
        {showItems && <ListItem items={data.itemCards} />}
      </div>
    </div>
  );
};

export default RestaurantCategories;
