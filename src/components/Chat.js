import { Button, Col, Form, Row } from "react-bootstrap";
import ChatList from "./ChatList";
import { contactSelector, sentMessage } from "../store/reducers/contactReducer";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

import { CiCirclePlus } from "react-icons/ci";

const Chat = () => {
  const dispatch = useDispatch();
  const { contacts } = useSelector(contactSelector);
  const { contactID } = useParams();
  const inputRef = useRef();

  const [currentContact, setCurrentContact] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    const contact = contacts.find((contact) => contact.id === contactID);
    setCurrentContact(contact || {});
  }, [contacts, contactID]);

  // console.log(currentContact?.chats);

  const hanldeSend = () => {
    let chat = {
      text: message,
      sent: true,
    };
    inputRef.current.value = "";
    setMessage("");
    dispatch(sentMessage({ chat, contactID }));
  };

  return (
    <>
      <div>
        <Row className="mx-2">
          <Col
            xs={3}
            className="bg-white"
            style={{ height: "100vh", border: "0.5px solid lightgray" }}
          >
            <ChatList />
          </Col>
          <Col xs={9} className="p-2 bg-light">
            <div className="d-flex justify-content-between align-items-center border-bottom">
              <div className="p-4">
                <img
                  src={
                    currentContact?.photoUrl
                      ? currentContact?.photoUrl
                      : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                  }
                  alt="avatar"
                  width="55"
                  height="55"
                  className="rounded-circle"
                ></img>
              </div>
              <div>{currentContact?.name}</div>
              <div>
                <CiCirclePlus size={25} />
              </div>
            </div>
            <div
              style={{ height: "80vh", overflowY: "auto" }}
              className="d-flex flex-column justify-content-end"
            >
              {/* <div className="px-2 py-1 d-flex justify-content-end"> */}
              {currentContact?.chats?.map((chat, index) => (
                <div
                  className="p-2 d-flex"
                  key={index}
                  style={{
                    justifyContent: chat.sent ? "end" : "start",
                  }}
                >
                  <span
                    className="px-3 py-1"
                    style={{
                      borderRadius: "10px",
                      backgroundColor: chat.sent ? "#329e63" : "#e0e8eb",
                      color: chat.sent ? "white" : "black",
                    }}
                  >
                    {chat.text}
                  </span>
                </div>
              ))}
            </div>
            <div className="py-2">
              <Row>
                <Col xs={11}>
                  <Form.Group className="px-2 pb-2">
                    <Form.Control
                      type="text"
                      placeholder="Type a message"
                      style={{ backgroundColor: "#e0e8eb" }}
                      onChange={(e) => setMessage(e.target.value)}
                      ref={inputRef}
                    ></Form.Control>
                  </Form.Group>
                </Col>
                <Col xs={1}>
                  <Button
                    style={{ backgroundColor: "#329e63", width: "100%" }}
                    onClick={hanldeSend}
                  >
                    {" "}
                    Send
                  </Button>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>

        <div className="d-flex justify-content-between align-items-center"></div>
      </div>
    </>
  );
};

export default Chat;
