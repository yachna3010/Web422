import { Container, Row, Col, Image } from 'react-bootstrap';
import { useState } from 'react';
import { useRouter } from 'next/router';

const Home = () => {
  const [searchField, setSearchField] = useState('');
  const router = useRouter();

  // Handle the search submission and route to the correct page
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchField.trim() !== '') {
      router.push(`/search?q=${searchField}`);  // Correctly route to the search results page
    }
  };

  return (
    <Container>
      <Row>
        {/* Image Section */}
        <Col>
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/3/30/Metropolitan_Museum_of_Art_%28The_Met%29_-_Central_Park%2C_NYC.jpg"
            alt="The Met"
            fluid
            rounded
            className="mb-4"
          />
        </Col>
      </Row>
      <Row>
        {/* Search Form */}
        <Col>
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              placeholder="Search"
              value={searchField}
              onChange={(e) => setSearchField(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
