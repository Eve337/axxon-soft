import React, { Component, useEffect, useState } from "react";
import { getUsers, getOrganizations } from "./api";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers()
      .then((users) => (setUsers(users)))
      .then(() => getOrganizations())
      .then((organizations) => (setOrganizations(organizations)))
      .then(() => setLoading(false));
  }, []);

  const changeSelectedOrg = (org) => {
    setSelectedOrg(org)
  };

  const resetSelectedOrg = () => {
    setSelectedOrg(null);
  }

  if (this.state.loading) {
    return "Loading...";
  }

  

  /* users.push(
    <div className="user-list-item">
      <div>name: {name}</div>
      <div onClick={() => this.selectOrg(org)}>org: {org}</div>
    </div>
  ); */

  /* if (this.state.selectedOrg) {
    users = [];
    for (let i = 0; i < this.users.length; i++) {
      const orgId = this.organizations.find(
        (o) => o.name === this.state.selectedOrg
      ).id;

      if (this.users[i].organization === orgId) {
        users.push(
          <div className="user-list-item">
            <div>name: {this.users[i].name}</div>
            <div>org: {this.state.selectedOrg}</div>
          </div>
        );
      }
    }
  } */

  return (
    <>
      <div>
        {this.state.selectedOrg && (
          <button onClick={() => this.resetSelectedOrg()}>
            reset selected org
          </button>
        )}
        <div className="user-list">{users}</div>
      </div>
    </>
  )
}

export default App;
