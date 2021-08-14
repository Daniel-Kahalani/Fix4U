/* eslint-disable no-undef */
const { UserType } = require('../utils/constants.js');

Parse.Cloud.define('getUserDataByGeneraUser', async (request) => {
  let { generalUser } = request.params;
  generalUser = JSON.parse(generalUser);
  let query = new Parse.Query(
    generalUser.userType === UserType.RSP ? 'RSP' : 'Customer'
  );
  query.equalTo('email', generalUser.email);
  const {
    objectId: specificUserId,
    createdAt,
    updatedAt,
    ...data
  } = await (await query.first()).toJSON();
  return {
    generalUserId: generalUser.objectId,
    username: generalUser.username,
    userType: generalUser.userType,
    specificUserId,
    ...data,
  };
});
