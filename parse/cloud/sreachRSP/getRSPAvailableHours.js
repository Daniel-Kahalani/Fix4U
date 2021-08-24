/* eslint-disable no-undef */
const { createRSPAvailableHours } = require('../utils/createRSPAvailableHours');

Parse.Cloud.define('getRSPAvailableHours', async (request) => {
  const { faultType, date, businessName } = request.params;
  let query = new Parse.Query('RSP');
  query.equalTo('businessName', businessName);
  const rsp = await query.first();
  if (!rsp) {
    throw new Parse.Error(
      330,
      `An RSP with the business name "${businessName}" doesn't exist`
    );
  }
  if (!rsp.get('expertise').includes(faultType)) {
    throw new Parse.Error(
      331,
      `The RSP "${businessName}" doesn't handle ${faultType} faults`
    );
  }
  return await createRspResults(rsp, date);
});

async function createRspResults(rsp, date) {
  const { fullName, businessName, visitCost, rank } = rsp.attributes;
  const rspId = rsp._getId();
  const availableHours = await createRSPAvailableHours(rspId, date);
  if (availableHours.length === 0) {
    throw new Parse.Error(
      332,
      `The RSP "${businessName}" is not available on ${date}`
    );
  }
  return {
    rspId,
    fullName,
    businessName,
    visitCost,
    rank,
    availableHours,
  };
}
