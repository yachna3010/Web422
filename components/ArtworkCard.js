import React from "react";
import FavouriteButton from "./FavouriteButton";

const ArtworkCard = ({ artwork }) => {
  const addToFavourites = (artwork) => {
    console.log(`Added to favourites: ${artwork.title}`);
  };

  return (
    <div className="card" style={{ margin: "20px", padding: "20px" }}>
      <img
        src={artwork.image || "https://via.placeholder.com/300"}
        className="card-img-top"
        alt={artwork.title}
      />
      <div className="card-body">
        <h5 className="card-title">{artwork.title}</h5>
        <p><strong>Date:</strong> {artwork.date}</p>
        <p><strong>Medium:</strong> {artwork.medium}</p>
        <p><strong>Artist:</strong> {artwork.artist}</p>
        <p><strong>Dimensions:</strong> {artwork.dimensions}</p>
        <FavouriteButton artwork={artwork} onAddToFavourites={addToFavourites} />
      </div>
    </div>
  );
};

export default ArtworkCard;
