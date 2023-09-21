import React from "react";
import "./MemberProfile.css";

const MemberProfile = ({ membersName, membersEmail }) => {
  return (
    <div className="membersProfile">
      <div>
        <img
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          alt="members profile pic"
        />
        <h3>{membersName}</h3>
        <p>{membersEmail}</p>
      </div>
      <button>Remove</button>
    </div>
  );
};

export default MemberProfile;
