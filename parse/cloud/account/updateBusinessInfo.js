/* eslint-disable no-undef */

const { createFullUserData } = require('../utils/createFullUserData.js');
const { validateBusinessName } = require('../utils/validateBusinessName');

Parse.Cloud.define('updateBusinessInfo', async (request) => {
  const {
    businessName,
    businessAddress,
    visitCost,
    expertise,
    generalUserId,
    specificUserId,
  } = request.params;

  await validateBusinessName(businessName, specificUserId);
  query = new Parse.Query('RSP');
  const specificUser = await query.get(specificUserId);
  specificUser.set({
    businessName: businessName.toLowerCase(),
    businessAddress: businessAddress.toLowerCase(),
    visitCost: Number(visitCost),
    expertise,
  });
  await specificUser.save();

  query = new Parse.Query('User');
  const user = await query.get(generalUserId);

  return createFullUserData(user, specificUser);
});
