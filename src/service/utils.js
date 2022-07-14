const createMapFromOrgs = (arr) => {
  const storage = new Map();

  for (let i = 0; i < arr.length; i++) {
    storage.set(arr[i].id, arr[i].name)
  }

  return storage;
}

export const createUserCards = (users, organization) => {
  const orgsMap = createMapFromOrgs(organization);

  return users.reduce((acc, curr) => {
    const newUserCard = {...curr, organizationName: orgsMap.get(curr.organization)}
    acc.push(newUserCard);
    return acc;
  }, []);
}

export const showUsersBySelectedOrgName = (usersCard, selectedName) => usersCard.filter((card) => card.organizationName === selectedName); 

export const promiseHandler = async (promiseReq, dataSetter, errorSetter) => promiseReq().then((users) => dataSetter(users)).catch(() => errorSetter(true));