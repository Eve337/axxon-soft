import React from 'react'

const UserCard = ({ name, organizationName, changeSelectedOrg }) => {
  return (
    <div className="user-list-item">
      <div>name: {name}</div>
      <div onClick={() => changeSelectedOrg(organizationName)}>org: {organizationName}</div>
    </div>
  )
}

export default UserCard