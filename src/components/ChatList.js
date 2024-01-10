import { Form } from "react-bootstrap";
import { contactSelector } from "../store/reducers/contactReducer";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatCard from "./ChatCard";

import { fetchContacts } from "../store/reducers/contactReducer";

import { CiCirclePlus } from "react-icons/ci";

const ChatList = () => {
  const { contacts } = useSelector(contactSelector);
  const { contactID } = useParams();
  const dispatch = useDispatch();

  console.log(contacts);
  const chattedContacts = contacts.filter((contact) => !contact.new);

  console.log(chattedContacts);

  useEffect(() => {
    dispatch(fetchContacts({ contactID }));
  }, []);
  return (
    <>
      <div className="d-flex flex-column ">
        <Form.Group className="px-2 pt-5 pb-2 ">
          <Form.Control
            type="text"
            placeholder="Search"
            style={{ backgroundColor: "#e0e8eb" }}
          ></Form.Control>
        </Form.Group>
        <div className="d-flex justify-content-between align-items-center p-2">
          <span style={{ fontSize: "14px", color: "#6b6b6b" }}>
            CONVERSATIONS
          </span>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              //show contacts list later
            }}
          >
            <CiCirclePlus size={25} />
          </span>
        </div>
        <div>
          {chattedContacts.map((contact) => {
            return <ChatCard key={contact.id} contact={contact} />;
          })}
        </div>
      </div>
    </>
  );
};

export default ChatList;
