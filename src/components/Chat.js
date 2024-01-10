import { Col, Row } from "react-bootstrap";
import ChatList from "./ChatList";
import { contactSelector } from "../store/reducers/contactReducer";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { CiCirclePlus } from "react-icons/ci";

const Chat = () => {
  const { contacts } = useSelector(contactSelector);
  const { contactID } = useParams();

  const [currentContact, setCurrentContact] = useState({});

  useEffect(() => {
    const contact = contacts.find(
      (contact) => contact.id === Number(contactID)
    );
    console.log(contact);
    setCurrentContact(contact);
  }, [contacts, contactID]);

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
                ></img>
              </div>
              <div>{currentContact?.name}</div>
              <div>
                <CiCirclePlus size={25} />
              </div>
            </div>
          </Col>
        </Row>

        <div className="d-flex justify-content-between align-items-center"></div>
      </div>
    </>
  );
};

export default Chat;
