import { useState } from 'react';
import { useRouter } from 'next/router';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../store';
import { addToHistory } from '../lib/userData';
import { readToken, removeToken } from '../lib/authenticate';
import { Form, Button } from 'react-bootstrap';

export default function MainNav() {
  const [searchField, setSearchField] = useState("");
  const router = useRouter();

  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  let token = readToken();

  async function submitForm(e) 
  {
    e.preventDefault();
    setIsExpanded(false);
    let queryString = `title=true&q=${searchField}`;
    setSearchHistory(await addToHistory(queryString));
    router.push(`/artwork?title=true&q=${searchField}`);
  }

  function toggleIsExpanded() {
    setIsExpanded(!isExpanded);
  }
  function closeNavBar() {
    setIsExpanded(false);
  }

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/login");
  }

  return (
    <>
      <Navbar
        bg="info"
        expand="lg"
        expanded={isExpanded}
        className="fixed-top navbar-dark bg-dark"
      >
        <Container>
          <Navbar.Brand>Prince Abiy</Navbar.Brand>
          <Navbar.Toggle
            onClick={toggleIsExpanded}
            aria-controls="basic-navbar-nav"
          />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link href="/" passHref legacyBehavior>
                <Nav.Link
                  onClick={closeNavBar}
                  active={router.pathname === "/"}
                >
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" passHref legacyBehavior>
                  <Nav.Link
                    onClick={closeNavBar}
                    active={router.pathname === "/search"}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            &nbsp;
            <Nav>
              {!token && (
                <Link href="/register" passHref legacyBehavior>
                  <Nav.Link
                    onClick={closeNavBar}
                    active={router.pathname === "/register"}
                  >
                    Register
                  </Nav.Link>
                </Link>
              )}
              {!token && (
                <Link href="/login" passHref legacyBehavior>
                  <Nav.Link
                    onClick={closeNavBar}
                    active={router.pathname === "/login"}
                  >
                    Login
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            {token && (
              <Form className="d-flex" onSubmit={submitForm}>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                  value={searchField}
                  onChange={(e) => setSearchField(e.target.value)}
                />
                <Button type="submit" className="button-success">
                  Search
                </Button>
              </Form>
            )}
            &nbsp;
            <Nav>
              {token && (
                <NavDropdown title={token.userName} id="basic-nav-dropdown">
                  <Link href="/favourites" passHref legacyBehavior>
                    <NavDropdown.Item
                      onClick={closeNavBar}
                      href="/favourites"
                      active={router.pathname === "/favourites"}
                    >
                      Favourites
                    </NavDropdown.Item>
                  </Link>
                  <Link href="/history" passHref legacyBehavior>
                    <NavDropdown.Item
                      onClick={closeNavBar}
                      href="/history"
                      active={router.pathname === "/history"}
                    >
                      Search History
                    </NavDropdown.Item>
                  </Link>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
