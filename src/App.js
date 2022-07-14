import React, { useEffect, useState, useRef } from "react";
import { getUsers, getOrganizations } from "./api";
import UserCard from "./components/UserCard/UserCard";
import { createUserCards, showUsersBySelectedOrgName } from "./service/utils";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [users, setUsers] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [isError, setIsError] = useState(false);

  const cardsRef = useRef();

  const handleUsersRequest = async () => getUsers().then((users) => setUsers(users)).catch(() => setIsError(true));
  const handleOrgsRequest = async () => getOrganizations().then((orgs) => setOrganizations(orgs)).catch(() => setIsError(true));

  useEffect(() => {
    handleUsersRequest();
    handleOrgsRequest();
  }, []);

  useEffect(() => {
    if (users.length && organizations.length) {
      const result = createUserCards(users, organizations);
      cardsRef.current = result;
      setUserCards(result);
      setLoading(false);
    }
  }, [users, organizations]);

  const changeSelectedOrg = (orgName) => {
    setSelectedOrg(orgName)

    const filteredUsers = showUsersBySelectedOrgName(userCards, orgName)
    setUserCards(filteredUsers);
  };

  const resetSelectedOrg = () => {
    setSelectedOrg(null);
    setUserCards(cardsRef.current);
  }

  if (isLoading) {
    return (
      <>
        Loading...
      </>
    );
  }


  return (
    <>
      {isError ? 
        (<>Something went wrong</>) : 
        (<div>
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
    </>
  )
}

export default App;
