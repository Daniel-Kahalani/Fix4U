/* eslint-disable no-undef */
const { NUM_OF_SEARCH_RESULTS } = require('./constants');

module.exports.getRecentRSPFeedbacks = async (rspId) => {
  const query = new Parse.Query('Feedback');
  query.equalTo('rspId', rspId);
  query.limit(NUM_OF_SEARCH_RESULTS);
  query.descending('createdAt');
  const feedbacks = await query.find();
  //   return feedbacks.map((feedback) => {
  //     const {obkec} = feedbacks;

  //   });
  return feedbacks;
};
