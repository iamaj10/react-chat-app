import { Form, Modal, Button, Row } from "react-bootstrap";
import { contactSelector } from "../store/reducers/contactReducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ChatCard from "./ChatCard";

import { fetchContacts } from "../store/reducers/contactReducer";

import { CiCirclePlus } from "react-icons/ci";

const ChatList = () => {
  const { contacts } = useSelector(contactSelector);
  // const { contactID } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showContactsList, setShowContactsList] = useState(false);
  const [search, setSearch] = useState("");

  const chattedContacts = contacts.filter((contact) => !contact.new);

  const sortedContacts = [...chattedContacts].sort((a, b) => {
    if (a.updated > b.updated) {
      return -1;
    }
    if (a.updated < b.updated) {
      return 1;
    }
    return 0;
  });

  const filteredContacts = sortedContacts.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  // console.log(contacts);
  // console.log(sortedContacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);
  return (
    <>
      {showContactsList && (
        <Modal
          show={showContactsList}
          // onHide={setShowContactsList(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header>
            <Modal.Title>All Contacts</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              {contacts.map((contact) => (
                <div
                  className="d-flex flex-row align-items-center py-2 px-3"
                  style={{
                    cursor: "pointer",
                    boxShadow: "0 2px 5px 0 rgba(0,0,0,0.05)",
                  }}
                  onClick={() => {
                    navigate(`/${contact.id}`);
                    setShowContactsList(false);
                  }}
                >
                  <img
                    // src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                    src={
                      contact?.photoUrl
                        ? contact?.photoUrl
                        : "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
                    }
                    alt="avatar"
                    width="55"
                    height="55"
                    className="rounded-circle"
                  ></img>
                  <div className="ms-3">
                    <p className="fw-bold mb-1">{contact.name}</p>
                    <p className="text-muted mb-0">{contact.lastMessage}</p>
                  </div>
                </div>
              ))}
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => setShowContactsList(false)}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <div className="d-flex flex-column ">
        <Form.Group className="px-2 pt-5 pb-2 ">
          <Form.Control
            type="text"
            placeholder="Search"
            style={{ backgroundColor: "#e0e8eb" }}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
          ></Form.Control>
        </Form.Group>
        <div className="d-flex justify-content-between align-items-center p-2">
          <span style={{ fontSize: "14px", color: "#6b6b6b" }}>
            CONVERSATIONS
          </span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              setShowContactsList(true);
            }}
          >
            <CiCirclePlus size={25} />
          </span>
        </div>
        <div>
          {filteredContacts.map((contact) => {
            return <ChatCard key={contact.id} contact={contact} />;
          })}
        </div>
      </div>
    </>
  );
};

export default ChatList;
