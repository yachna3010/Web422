// pages/final.js
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

const Final = () => {
  const router = useRouter();
  const { q, geoLocation, medium, isHighlight, isOnView } = router.query; // Get query parameters
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const performSearch = async () => {
      setLoading(true);
      setError(null);
      setSearchResults([]);

      const queryParams = new URLSearchParams();
      if (q) queryParams.append('q', q);
      if (geoLocation) queryParams.append('geoLocation', geoLocation);
      if (medium) queryParams.append('medium', medium);
      if (isHighlight) queryParams.append('isHighlight', isHighlight);
      if (isOnView) queryParams.append('isOnView', isOnView);

      try {
        const response = await fetch(
          `https://collectionapi.metmuseum.org/public/collection/v1/search?${queryParams.toString()}`
        );
        const results = await response.json();

        if (results.objectIDs && results.objectIDs.length > 0) {
          const detailsPromises = results.objectIDs.slice(0, 10).map(async (id) => {
            const res = await fetch(
              `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
            );
            return res.json();
          });
          const details = await Promise.all(detailsPromises);
          setSearchResults(details);
        } else {
          setError('No results found.');
        }
      } catch (err) {
        setError('Error fetching search results.');
      } finally {
        setLoading(false);
      }
    };

    performSearch();
  }, [q, geoLocation, medium, isHighlight, isOnView]);

  return (
    <Container>
      <h2 className="mb-4">Search Results</h2>
      {loading && <Spinner animation="border" className="mt-4" />}
      {error && <p className="text-danger mt-4">{error}</p>}
      {searchResults.length > 0 && (
        <Row className="mt-4">
          {searchResults.map((result) => (
            <Col key={result.objectID} sm={12} md={6} lg={4} className="mb-4">
              <Card>
                <Card.Img
                  variant="top"
                  src={result.primaryImage || 'https://via.placeholder.com/375x375.png?text=[+Not+Available+]'}
                  alt={result.title || 'Artwork'}
                />
                <Card.Body>
                  <Card.Title>{result.title || 'Title Not Available'}</Card.Title>
                  <Card.Text>
                    <strong>Date:</strong> {result.objectDate || 'Not Available'} <br />
                    <strong>Classification:</strong> {result.classification || 'Not Available'} <br />
                    <strong>Medium:</strong> {result.medium || 'Not Available'}
                  </Card.Text>
                  <button
                    className="btn btn-outline-primary w-100"
                    onClick={() => router.push(`/details?id=${result.objectID}`)}
                  >
                    ID: {result.objectID}
                  </button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Final;
