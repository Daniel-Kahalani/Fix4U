/* eslint-disable no-undef */

const { UserType } = require('../utils/constants.js');
const { createFullUserData } = require('../utils/createFullUserData.js');

Parse.Cloud.define('updatePersonalInfo', async (request) => {
  const { email, password, generalUserId } = request.params;
  let query = new Parse.Query('User');
  const user = await query.get(generalUserId);
  const isUserRSP = user.get('userType') === UserType.RSP ? true : false;

  const specificUser = await updateSpedificUser(request.params, isUserRSP);
  user.set({ email: email.toLowerCase(), username: email.toLowerCase() });
  if (password) {
    user.set({ password });
  }
  await user.save(null, { useMasterKey: true });
  return createFullUserData(user, specificUser);
});

async function updateSpedificUser(
  { fullName, address, phone, email, specificUserId },
  isUserRSP
) {
  let query = isUserRSP ? new Parse.Query('RSP') : new Parse.Query('Customer');
  const specificUser = await query.get(specificUserId);
  specificUser.set({
    fullName: fullName.toLowerCase(),
    phone,
    email: email.toLowerCase(),
  });
  if (!isUserRSP) {
    specificUser.set({ address: address.toLowerCase() });
  }
  await specificUser.save();
  return specificUser;
}
