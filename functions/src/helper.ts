export const getDisplayName = (firstName: string, lastName: string) => {
  firstName = firstName.trim();
  lastName = lastName.trim();
  return `${firstName.substr(0, 1).toUpperCase()}${firstName.substring(1)} ${lastName
    .substr(0, 1)
    .toUpperCase()}${lastName.substring(1)}`;
};
