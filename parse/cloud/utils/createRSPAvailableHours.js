/* eslint-disable no-undef */
const {
  convertTimeToNum,
  convertTimeToStr,
} = require('./convertTimeFormat.js');

const { AppointmentStatus } = require('./constants');

module.exports.createRSPAvailableHours = async (rspId, date) => {
  const query1 = new Parse.Query('Appointment');
  query1.equalTo('rspID', rspId);
  query1.equalTo('date', date);
  query1.equalTo('status', AppointmentStatus.APPROVED);

  const query2 = new Parse.Query('Appointment');
  query2.equalTo('rspID', rspId);
  query2.equalTo('date', convertDateFormat(date));
  query2.equalTo('status', AppointmentStatus.APPROVED);

  const query = Parse.Query.or(query1, query2);
  const appointments = await query.find();

  let availableHours = findTwoHoursWindow(createHoursArray(), appointments);
  return availableHours.map((time) => convertTimeToStr(time));
};

function convertDateFormat(date) {
  const dateArr = date.split('/');
  const formatedDate = `20${dateArr[2]}-${dateArr[1]}-${dateArr[0]}`;
  return formatedDate;
}

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
