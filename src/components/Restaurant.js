import React from "react";
import { CDN_URL } from "../../utils/constant";

const RestaurantCard = (props) => {
  const { resData } =  props;

  const {name,cuisines,avgRating,sla
  } = resData?.card.card.info

   return (
    <div className="res-card" style={{backgroundColor: "#f0f0f0"}}>
      <img 
       className="res-logo" 
       alt="res-logo" 
       src={CDN_URL+resData.card.card.info.cloudinaryImageId}
       />
      <h3>{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRating}</h4>
      <h4> {sla.deliveryTime} Minutes</h4>
    </div>
  )
}

export default RestaurantCard;