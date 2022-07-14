const createMapFromOrgs = (arr) => {
  const storage = new Map();

  arr.map((current) => { storage.set(current.id, current.name) });

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