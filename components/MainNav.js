import Link from "next/link";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { readToken, removeToken } from "../lib/authenticate";

const MainNav = () => {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const savedToken = readToken();
    setToken(savedToken || null);
  }, []);

  const logout = () => {
    removeToken();
    setToken(null);
    router.push("/login");
  };

  return (
    <Navbar expand="lg" className="fixed-top navbar-dark bg-dark" style={{ zIndex: 1030 }}>
      <Navbar.Brand>
        <Link href="/" passHref>
          Yachna Patel {/* Removed <a> */}
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Link href="/" passHref>
            <Nav.Link>Home</Nav.Link>
          </Link>
        </Nav>
        <Nav>
          {!token ? (
            <>
              <Link href="/register" passHref>
                <Nav.Link>Register</Nav.Link>
              </Link>
              <Link href="/login" passHref>
                <Nav.Link>Log In</Nav.Link>
              </Link>
            </>
          ) : (
            <NavDropdown title="User" id="user-dropdown">
              <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
            </NavDropdown>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MainNav;
