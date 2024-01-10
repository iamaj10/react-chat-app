import { useNavigate } from "react-router-dom";

const ChatCard = ({ contact }) => {
  const navigate = useNavigate();
  const handleClick = () => {};

  return (
    <>
      <div
        className="d-flex flex-row align-items-center py-2 px-3"
        style={{ cursor: "pointer", boxShadow: "0 2px 5px 0 rgba(0,0,0,0.05)" }}
        onClick={() => {
          navigate(`/${contact.id}`);
        }}
      >
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3-bg.webp"
          alt="avatar"
          width="55"
          height="55"
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
