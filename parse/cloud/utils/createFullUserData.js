module.exports.createFullUserData = (generalUser, specificUser) => {
  const {
    objectId: specificUserId,
    createdAt: sepecificCreatedAt,
    updatedAt: sepecificUpdatedAt,
    ...specificUserData
  } = specificUser.toJSON();

  const {
    objectId: generalUserId,
    createdAt: generalCreatedAt,
    updatedAt: generalUpdatedAt,
    sessionToken,
    ACL,
    password,
    ...generalUserData
  } = generalUser.toJSON();

  return {
    specificUserId,
    generalUserId,
    ...generalUserData,
    ...specificUserData,
  };
};
