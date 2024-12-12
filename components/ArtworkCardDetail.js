import { useState } from 'react';
import FavouriteButton from './FavouriteButton';

const ArtworkDetails = ({ artwork }) => {
  const [favourites, setFavourites] = useState([]);

  const addToFavourites = (artwork) => {
    setFavourites((prevFavourites) => [...prevFavourites, artwork]);
  };

  return (
    <div className="artwork-details">
      <img src={artwork.imageUrl} alt={artwork.title} />
      <h3>{artwork.title}</h3>
      <p><strong>Date:</strong> {artwork.date}</p>
      <p><strong>Artist:</strong> {artwork.artist}</p>
      <p><strong>Medium:</strong> {artwork.medium}</p>
      <p><strong>Dimensions:</strong> {artwork.dimensions}</p>

      {/* Favourite Button for the individual artwork */}
      <FavouriteButton artwork={artwork} onAddToFavourites={addToFavourites} />

      <div className="favourites-list">
        <h4>Favourites</h4>
        <ul>
          {favourites.map((fav, index) => (
            <li key={index}>{fav.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ArtworkDetails;
