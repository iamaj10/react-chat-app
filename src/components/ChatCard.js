import { useNavigate, useParams } from "react-router-dom";

const ChatCard = ({ contact }) => {
  const navigate = useNavigate();
  const { contactID } = useParams();
  return (
    <>
      <div
        className="d-flex flex-row align-items-center py-2 px-3"
        style={{
          cursor: "pointer",
          boxShadow: "0 2px 5px 0 rgba(0,0,0,0.05)",
          backgroundColor: contactID === contact.id ? "#e0e8eb" : "white",
        }}
        onClick={() => {
          navigate(`/${contact.id}`);
        }}
      >
        <img
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
    </>
  );
};

export default ChatCard;
