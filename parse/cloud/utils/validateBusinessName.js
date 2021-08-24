/* eslint-disable no-undef */

module.exports.validateBusinessName = async (businessName, rspId) => {
  let query = new Parse.Query('RSP');
  query.equalTo('businessName', businessName.toLowerCase());
  const rsp = await query.first();
  if (rsp && rsp.id !== rspId) {
    throw new Parse.Error(310, `Business name "${businessName}" already taken`);
  }
  return true;
};
