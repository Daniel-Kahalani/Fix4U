/* eslint-disable no-undef */

Parse.Cloud.define('register', async (request) => {
  const { email, password, userType } = request.params;
  const generalUser = await Parse.User.signUp(email, password, {
    email,
    userType,
  });
  try {
    const specificUser =
      userType === 'rsp'
        ? await registerRSP(request.params)
        : await registerCustomer(request.params);

    return createFullUserData(generalUser, specificUser, request.params);
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
    email,
    fullName,
    phone,
    businessAddress,
    businessName,
    visitCost: Number(visitCost),
    expertise,
  });
  return await RSP.save();
}

async function registerCustomer({ fullName, address, phone, email }) {
  const Customer = new Parse.Object('Customer');
  Customer.set({ email, fullName, address, phone });
  return await Customer.save();
}

function createFullUserData(generalUser, specificUser, params) {
  return {
    generalUserId: generalUser.id,
    specificUserId: specificUser.id,
    username: params.email,
    ...params,
  };
}