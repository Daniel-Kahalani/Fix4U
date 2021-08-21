/* eslint-disable no-undef */
const { createRSPAvailableHours } = require('../utils/searchRSPUtils.js');

Parse.Cloud.define('getAvailableRSPs', async (request) => {
  const { faultType, date } = request.params;
  if (!faultType || !date) {
    throw new Parse.Error(1, 'Missing at least one function params');
  }
  let query = new Parse.Query('RSP');
  query.containedIn('expertise', [faultType]);
  query.descending('rank');
  query.limit(3);
  const topRsps = await query.find();
  return await createRspResults(topRsps, date);
});

async function createRspResults(topRsps, date) {
  let resultsData = await Promise.all(
    topRsps.map(async (rsp) => {
      const { fullName, businessName, visitCost, rank } = rsp.attributes;
      const rspId = rsp._getId();
      const availableHours = await createRSPAvailableHours(rspId, date);
      if (availableHours.length === 0) {
        return null;
      }
      return {
        rspId,
        fullName,
        businessName,
        visitCost,
        rank,
        availableHours,
      };
    })
  );
  if (resultsData.every((element) => element === null)) {
    throw new Parse.Error(14, `There no RSP available on the ${date}`);
  }
  return resultsData;
}
