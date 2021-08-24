/* eslint-disable no-undef */
const {
  convertTimeToNum,
  convertTimeToStr,
} = require('./convertTimeFormat.js');

const { AppointmentStatus } = require('./constants');

module.exports.createRSPAvailableHours = async (rspId, date) => {
  const query = new Parse.Query('Appointment');
  query.equalTo('rspID', rspId);
  query.equalTo('date', date);
  query.equalTo('status', AppointmentStatus.APPROVED);

  const appointments = await query.find();
  let availableHours = findTwoHoursWindow(createHoursArray(), appointments);
  return availableHours.map((time) => convertTimeToStr(time));
};

function createHoursArray(startTime = 8, endTime = 17) {
  let hoursArrays = [];
  for (let i = startTime; i <= endTime - 2; i = i + 0.5) {
    hoursArrays.push(i);
  }
  return hoursArrays;
}

function findTwoHoursWindow(hoursArr, appointments) {
  appointments.forEach((appointment) => {
    if (hoursArr.length !== 0) {
      const startTimeNum = convertTimeToNum(appointment.get('startTime'));
      const endTimeNum = convertTimeToNum(appointment.get('endTime'));
      hoursArr = hoursArr.filter((time) =>
        time >= startTimeNum - 1.5 && time <= endTimeNum - 0.5 ? false : true
      );
    }
  });
  return hoursArr;
}
