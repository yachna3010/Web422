import React, { useState } from "react";

const FavouriteButton = ({ artwork, onAddToFavourites }) => {
  const [isFavourite, setIsFavourite] = useState(false);

  const handleClick = () => {
    setIsFavourite(!isFavourite);
    onAddToFavourites(artwork);
  };

  return (
    <button
      onClick={handleClick}
      className={`btn ${isFavourite ? "btn-success" : "btn-outline-success"}`}
    >
      {isFavourite ? "Added to Favourites" : "Add to Favourites"}
    </button>
  );
};

export default FavouriteButton;
