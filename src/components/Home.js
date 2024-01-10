import { Col, Row } from "react-bootstrap";
import ChatList from "./ChatList";

const Home = () => {
  console.log("Home");
  return (
    <div>
      <Row className="ms-2">
        <Col
          xs={3}
          className="bg-white"
          style={{ height: "95vh", border: "0.5px solid lightgray" }}
        >
          <ChatList />
        </Col>
        <Col xs={9}>
          {" "}
          <h1>Home</h1>
        </Col>
      </Row>

      <div className="d-flex justify-content-between align-items-center"></div>
    </div>
  );
};

export default Home;
