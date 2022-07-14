import React, { useEffect, useState, useRef } from "react";
import { getUsers, getOrganizations } from "./api";
import { createUserCards, promiseHandler, showUsersBySelectedOrgName } from "./service/utils";
import ErrorMessage from "./components/Error/Error";
import Loader from "./components/Loader/Loader";
import UsersList from "./components/UsersList/UsersList";

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [organizations, setOrganizations] = useState([]);
  const [users, setUsers] = useState([]);
  const [userCards, setUserCards] = useState([]);
  const [isError, setIsError] = useState(false);

  const cardsRef = useRef();

  useEffect(() => {
    promiseHandler(getUsers, setUsers, setIsError);
    promiseHandler(getOrganizations, setOrganizations, setIsError);
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
      <Loader />
    );
  }

  return (
    <>
      {isError ? 
        <ErrorMessage /> : 
        <UsersList 
          userCards={userCards} 
          selectedOrg={selectedOrg} 
          resetSelectedOrg={resetSelectedOrg} 
          changeSelectedOrg={changeSelectedOrg}
        />
      }
    </>
  )
}

export default App;
