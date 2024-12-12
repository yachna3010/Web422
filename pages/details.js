// pages/details.js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner, Alert, Button } from 'react-bootstrap';

const Details = () => {
  const router = useRouter();
  const { id } = router.query;
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const fetchFavorites = () => {
      const storedFavorites = JSON.parse(localStorage.getItem('favourites')) || [];
      setFavorites(storedFavorites.map((fav) => fav.objectID));
    };

    fetchFavorites();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchDetails = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
          );
          const data = await response.json();
          setArtwork(data);
        } catch (err) {
          setError('Failed to fetch artwork details.');
        } finally {
          setLoading(false);
        }
      };

      fetchDetails();
    }
  }, [id]);

  const toggleFavorite = () => {
    const storedFavorites = JSON.parse(localStorage.getItem('favourites')) || [];
    const isFavorite = favorites.includes(id);

    if (isFavorite) {
      const updatedFavorites = storedFavorites.filter((fav) => fav.objectID !== id);
      localStorage.setItem('favourites', JSON.stringify(updatedFavorites));
      setFavorites(favorites.filter((favId) => favId !== id));
    } else {
      const newFavorite = { ...artwork, objectID: id };
      const updatedFavorites = [...storedFavorites, newFavorite];
      localStorage.setItem('favourites', JSON.stringify(updatedFavorites));
      setFavorites([...favorites, id]);
    }
  };

  if (loading) return <Spinner animation="border" className="mt-4" />;
  if (error) return <Alert variant="danger" className="mt-4">{error}</Alert>;

  return (
    <Container className="mt-4">
      {artwork ? (
        <>
          <Row>
            <Col md={6}>
              <img
                src={artwork.primaryImage || 'https://via.placeholder.com/500x500.png?text=[+Not+Available+]'}
                alt={artwork.title || 'Artwork Image'}
                className="img-fluid"
              />
            </Col>
            <Col md={6}>
              <h1>{artwork.title || 'Title Not Available'}</h1>
              <p><strong>Date:</strong> {artwork.objectDate || 'Not Available'}</p>
              <p><strong>Classification:</strong> {artwork.classification || 'Not Available'}</p>
              <p><strong>Medium:</strong> {artwork.medium || 'Not Available'}</p>
              <p>
                <strong>Artist:</strong>{' '}
                {artwork.artistDisplayName ? (
                  <>
                    {artwork.artistDisplayName}{' '}
                    {artwork.artistWikidata_URL && (
                      <a
                        href={artwork.artistWikidata_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        (wiki)
                      </a>
                    )}
                  </>
                ) : (
                  'Not Available'
                )}
              </p>
              <p><strong>Credit Line:</strong> {artwork.creditLine || 'Not Available'}</p>
              <p><strong>Dimensions:</strong> {artwork.dimensions || 'Not Available'}</p>
              <Button
                variant={favorites.includes(id) ? 'success' : 'outline-primary'}
                onClick={toggleFavorite}
                className="mt-3"
              >
                {favorites.includes(id) ? 'Unfavorite' : 'Add to Favorites'}
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <Alert variant="danger" className="mt-4">
          Artwork details not available.
        </Alert>
      )}
    </Container>
  );
};

export default Details;
