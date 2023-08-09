import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";

const ListItem = ({ items }) => {
  const dispatch = useDispatch();
  const handleItems = (item) => {
    dispatch(addItem(item));
  };

  return (
    <div>
      {items.map((item) => (
        <div
          key={item.card.info.id}
          className="p-2 m-2 border-gray-200 border-b-2 text-left flex justify-between "
        >
          <div className="detailsItem w-9/12 ">
            <div className="py-2 space-x-2">
              <span>{item.card.info.name}</span>
              <span>
                ₹
                {item.card.info.price
                  ? item.card.info.price / 100
                  : item.card.info.defaultPrice / 100}
              </span>
            </div>
            <p className="text-xs font-extralight">
              {item.card.info.description}
            </p>
          </div>
          <div className="img w-3/12 flex  shadow-lg rounded-lg ">
            <button
              className="p-1 text-black bg-gray-200 rounded-lg"
              onClick={() => {
                handleItems(item);
              }}
            >
              Add +
            </button>
            <img
              src={CDN_URL + item.card.info.imageId}
              className="w-28 rounded-lg"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListItem;
