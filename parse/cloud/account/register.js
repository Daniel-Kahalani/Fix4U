/* eslint-disable no-undef */
const { createFullUserData } = require('../utils/createFullUserData.js');
const { validateBusinessName } = require('../utils/validateBusinessName.js');

const { UserType } = require('../utils/constants.js');

Parse.Cloud.define('register', async (request) => {
  const { email, password, userType, pushToken, businessName } = request.params;

  if (userType === UserType.RSP) {
    await validateBusinessName(businessName);
  }
  const generalUser = await Parse.User.signUp(email.toLowerCase(), password, {
    email: email.toLowerCase(),
    userType,
    pushTokens: [pushToken],
  });
  try {
    const specificUser =
      userType === UserType.RSP
        ? await registerRSP(request.params)
        : await registerCustomer(request.params);

    return createFullUserData(generalUser, specificUser);
  } catch (e) {
    await generalUser.destroy({ useMasterKey: true });
    throw e;
  }
});

async function registerRSP({
  fullName,
  phone,
  email,
  businessAddress,
  businessName,
  visitCost,
  expertise,
}) {
  const RSP = new Parse.Object('RSP');
  RSP.set({
    email: email.toLowerCase(),
    fullName: fullName.toLowerCase(),
    phone,
    businessAddress: businessAddress.toLowerCase(),
    businessName: businessName.toLowerCase(),
    visitCost: Number(visitCost),
    expertise,
  });
  return await RSP.save();
}

async function registerCustomer({ fullName, address, phone, email }) {
  const Customer = new Parse.Object('Customer');
  Customer.set({
    email: email.toLowerCase(),
    fullName: fullName.toLowerCase(),
    address: address.toLowerCase(),
    phone,
  });
  return await Customer.save();
}
