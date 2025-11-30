import React, { useEffect, useState } from "react";
import RestaurantCard from "./Restaurant";
import Shimmer from "./Shimmer";
// import resList from "../../utils/mockData";

const Body = () => {

  const [listOfRestaurants, setListOfRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.97530&lng=77.59100&collection=83639&tags=layout_CCS_Biryani&sortBy=&filters=&type=rcv2&offset=0&page_type=null"
    );

    const json = await data.json();
    console.log(json);
    const singles = json.data.cards.filter(
      (item) => item?.card && item?.card?.card && item?.card?.card?.info
    );
    setListOfRestaurants(singles);
    setFilteredRestaurants(singles);
  };


  return listOfRestaurants == 0 ? (<Shimmer />
  ) : (
    <div className="body">
      <div className="filter">
        <div className="search">
          <input
            type="text"
            className="search-box"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }} placeholder="Search restaurants..." />

          <button
            onClick={() => {
              const filteredResturant = listOfRestaurants.filter((res) => {
                return res.card.card.info.name.toLowerCase().includes(searchText.toLowerCase());
              });
              setFilteredRestaurants(filteredResturant);
            }}
          >Search</button>
          <button
            className="filter-btn"
            onClick={() => {
              const filteredList = listOfRestaurants.filter(
                (res) => res.card.card.info.avgRating > 4.5
              );
              setListOfRestaurants(filteredList);
            }}
          >
            Top Rated Restaurant
          </button>
        </div>
      </div>
      <div className="res-container">
        {filteredRestaurants.map((restaurant) => (
          <RestaurantCard key={restaurant.card.card.info.id} resData={restaurant} />
        ))}

      </div>
    </div>
  )
}

export default Body;