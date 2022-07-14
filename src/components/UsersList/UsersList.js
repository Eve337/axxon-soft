import React from 'react';
import UserCard from "./UserCard/UserCard";

const UsersList = ({ userCards, selectedOrg, resetSelectedOrg, changeSelectedOrg }) => {
  return (
    <div>
      {selectedOrg && (
        <button onClick={resetSelectedOrg}>
          reset selected org
        </button>
      )}
      <div className="user-list">
        {userCards.map(({ name, organizationName, id }) => (
          <UserCard 
            changeSelectedOrg={changeSelectedOrg}
            key={id} 
            name={name} 
            organizationName={organizationName} />
        ))}
      </div>
    </div>)
}

export default UsersList