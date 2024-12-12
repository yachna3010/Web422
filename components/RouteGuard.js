import Link from 'next/link';
import { Navbar, Nav, NavDropdown, Form, FormControl, Button, Container } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { readToken, removeToken, isAuthenticated } from '../lib/authenticate';

const MainNav = () => {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [token, setToken] = useState(() => readToken() || null); // Synchronously initialize token

  useEffect(() => {
    // Update token state on page load or token change
    const savedToken = readToken();
    setToken(savedToken || null);
  }, []);

  const handleToggle = () => setIsExpanded((prev) => !prev);
  const handleCollapse = () => setIsExpanded(false);
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/results?q=${encodeURIComponent(searchQuery)}&searchBy=title`);
      setSearchQuery('');
      handleCollapse();
    }
  };

  const logout = () => {
    removeToken();
    setToken(null);
    setIsExpanded(false);
    router.push('/login');
  };

  return (
    <Navbar expanded={isExpanded} className="fixed-top navbar-dark bg-primary" expand="lg">
      <Container>
        <Navbar.Brand>Student Name</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" onClick={handleToggle} />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Link legacyBehavior passHref href="/">
              <Nav.Link active={router.pathname === '/'} onClick={handleCollapse}>
                Home
              </Nav.Link>
            </Link>
            {token && (
              <Link legacyBehavior passHref href="/search">
                <Nav.Link active={router.pathname === '/search'} onClick={handleCollapse}>
                  Advanced Search
                </Nav.Link>
              </Link>
            )}
          </Nav>
          {token && (
            <Form className="d-flex" onSubmit={handleSearch}>
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button className="btn btn-success" type="submit">
                Search
              </Button>
            </Form>
          )}
          <Nav>
            {token ? (
              <NavDropdown title={token.userName || 'User'} id="basic-nav-dropdown">
                <Link legacyBehavior passHref href="/favourites">
                  <NavDropdown.Item onClick={handleCollapse}>
                    Favourites
                  </NavDropdown.Item>
                </Link>
                <Link legacyBehavior passHref href="/history">
                  <NavDropdown.Item onClick={handleCollapse}>
                    Search History
                  </NavDropdown.Item>
                </Link>
                <NavDropdown.Item
                  onClick={() => {
                    handleCollapse();
                    logout();
                  }}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Link legacyBehavior passHref href="/register">
                  <Nav.Link onClick={handleCollapse}>Register</Nav.Link>
                </Link>
                <Link legacyBehavior passHref href="/login">
                  <Nav.Link onClick={handleCollapse}>Log In</Nav.Link>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNav;
