import { Col, Row } from "react-bootstrap";
import ChatList from "./ChatList";
import { BsChatLeftTextFill } from "react-icons/bs";

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
          <div
            className="d-flex justify-content-center align-items-center border-bottom"
            style={{ height: "95vh" }}
          >
            <div className="d-flex flex-column">
              {" "}
              <span className="mx-2">
                <BsChatLeftTextFill size={30} />
              </span>
              <span>Welcome to Chat Now!</span>
              <span className="text-muted">Select a contact to start chatting</span>
            </div>
          </div>
        </Col>
      </Row>

      <div className="d-flex justify-content-between align-items-center"></div>
    </div>
  );
};

export default Home;
