/* eslint-disable no-undef */
const { NUM_OF_SEARCH_RESULTS } = require('../utils/constants');
const {
  createRSPAvailableHours,
} = require('../utils/createRSPAvailableHours.js');
const { getRecentRSPFeedbacks } = require('../utils/getRecentRSPFeedbacks.js');

Parse.Cloud.define('getAvailableRSPs', async (request) => {
  const { faultType, date } = request.params;
  let query = new Parse.Query('RSP');
  query.containedIn('expertise', [faultType]);
  query.descending('rating');
  query.limit(NUM_OF_SEARCH_RESULTS);
  const topRsps = await query.find();
  return await createRspResults(topRsps, date);
});

async function createRspResults(topRsps, date) {
  let resultsData = await Promise.all(
    topRsps.map(async (rsp) => {
      const { fullName, businessName, visitCost, rating, votes } =
        rsp.attributes;
      const rspId = rsp._getId();
      const availableHours = await createRSPAvailableHours(rspId, date);
      const recentFeedbacks = await getRecentRSPFeedbacks(rspId);
      return {
        rspId,
        fullName,
        businessName,
        visitCost,
        rating,
        votes,
        availableHours,
        recentFeedbacks,
      };
    })
  );
  if (resultsData.every((element) => element.availableHours.length === 0)) {
    throw new Parse.Error(320, `There no RSP available on the ${date}`);
  }
  return resultsData;
}
