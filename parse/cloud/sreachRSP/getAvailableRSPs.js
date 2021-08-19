/* eslint-disable no-undef */
const {
  convertTimeToNum,
  convertTimeToStr,
} = require('../utils/convertTimeFormat.js');

Parse.Cloud.define('getAvailableRSPs', async (request) => {
  const { faultType, date } = request.params;

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
  return resultsData;
}

async function createRSPAvailableHours(rspId, date) {
  const query = new Parse.Query('Appointment');
  query.equalTo('rspID', rspId);
  query.equalTo('date', date);
  const appointments = await query.find();
  let availableHours = [];
  for (let time = 8; time <= 16; time = time + 0.5) {
    if (
      appointments.length === 0 ||
      isTwoHoursWindowExist(appointments, time)
    ) {
      availableHours.push(convertTimeToStr(time));
    }
  }
  return availableHours;
}

function isTwoHoursWindowExist(appointments, startTime) {
  return appointments.find((appointment) => {
    const startTimeNum = convertTimeToNum(appointment.get('startTime'));
    const endTimeNum = convertTimeToNum(appointment.get('endTime'));

    return (
      startTimeNum === startTime ||
      startTimeNum === startTime + 0.5 ||
      startTimeNum === startTime + 1 ||
      startTimeNum === startTime + 1.5 ||
      endTimeNum === startTime + 0.5 ||
      endTimeNum === startTime + 1 ||
      endTimeNum === startTime + 1.5
    );
  })
    ? false
    : true;
}
