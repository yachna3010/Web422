import { useState, useEffect } from 'react';
import { Container, Button, Row, Col } from 'react-bootstrap';

const SearchHistory = () => {
  const [searchHistory, setSearchHistory] = useState([]);

  // Load search history from localStorage on component mount
  useEffect(() => {
    const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    setSearchHistory(storedHistory);
  }, []);

  // Function to remove an item from history
  const removeFromHistory = (index) => {
    const updatedHistory = searchHistory.filter((_, i) => i !== index);
    setSearchHistory(updatedHistory);
    localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
  };

  return (
    <Container className="mt-5">
      <h1>Search History</h1>
      {searchHistory.length > 0 ? (
        <ul className="list-group">
          {searchHistory.map((term, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <span>
                <strong>Title:</strong> {term.title} <strong>Query:</strong> {term.q}
              </span>
              <Button
                variant="danger"
                size="sm"
                onClick={() => removeFromHistory(index)}
              >
                ✖
              </Button>
            </li>
          ))}
        </ul>
      ) : (
        <div className="text-center">
          <h3>No History Found</h3>
          <p>Perform a search to populate this page.</p>
        </div>
      )}
    </Container>
  );
};

export default SearchHistory;
