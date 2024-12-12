import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { Container, Spinner, Row, Col, Button } from 'react-bootstrap';

const DetailsPage = () => {
  const router = useRouter();
  const { id } = router.query; // Get the ID from query parameters
  const [artwork, setArtwork] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchDetails = async () => {
        try {
          const response = await fetch(
            `https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch artwork details');
          }
          const data = await response.json();
          setArtwork(data);
        } catch (err) {
          setError('Error fetching artwork details.');
          console.error(err);
        } finally {
          setLoading(false);
        }
      };

      fetchDetails();
    }
  }, [id]);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p>Loading artwork details...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="text-center mt-5">
        <p className="text-danger">{error}</p>
        <Button variant="outline-primary" onClick={() => router.back()}>
          Go Back
        </Button>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      {artwork ? (
        <>
          <Row className="mb-4">
            <Col>
              <h1>{artwork.title || 'Title Not Available'}</h1>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <img
                src={artwork.primaryImage || 'https://via.placeholder.com/500x500.png?text=[+Not+Available+]'}
                alt={artwork.title}
                className="img-fluid rounded"
              />
            </Col>
            <Col md={6}>
              <p><strong>Date:</strong> {artwork.objectDate || 'Not Available'}</p>
              <p><strong>Classification:</strong> {artwork.classification || 'Not Available'}</p>
              <p><strong>Medium:</strong> {artwork.medium || 'Not Available'}</p>
              <p><strong>Artist:</strong> {artwork.artistDisplayName || 'Not Available'}</p>
              <p><strong>Dimensions:</strong> {artwork.dimensions || 'Not Available'}</p>
              <p><strong>Credit Line:</strong> {artwork.creditLine || 'Not Available'}</p>
              {artwork.artistWikidata_URL && (
                <p>
                  <strong>Artist Wiki:</strong>{' '}
                  <a href={artwork.artistWikidata_URL} target="_blank" rel="noopener noreferrer">
                    Learn more
                  </a>
                </p>
              )}
              <Button variant="outline-secondary" className="mt-3" onClick={() => router.back()}>
                Back to Results
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <p>Artwork details not available.</p>
      )}
    </Container>
  );
};

export default DetailsPage;
