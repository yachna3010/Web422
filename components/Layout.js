import MainNav from "./MainNav";
import { Container } from "react-bootstrap";

const Layout = ({ children }) => {
  return (
    <div>
      <MainNav />
      <Container style={{ paddingTop: "80px" }}>
        {children}
      </Container>
    </div>
  );
};

export default Layout;
