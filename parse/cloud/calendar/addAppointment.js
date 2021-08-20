/* eslint-disable no-array-constructor */
/* eslint-disable no-undef */

const { UserType } = require('../utils/constants.js');

Parse.Cloud.define('addAppointment', async (request) => {
  const { startTime, endTime, title, description, specificUserId, userType } =
    request.params;
  const Appointment = new Parse.Object('Appointment');
  Appointment.set('description', description);
  Appointment.set('title', title);
  Appointment.set('startTime', startTime);
  Appointment.set('endTime', endTime);
  Appointment.set('rspID', specificUserId);
  try {
    let result = await (await Appointment.save()).toJSON();
    await addAppointmentToRSP(result.objectId, specificUserId, userType);
    return result;
  } catch (error) {
    throw new Error('Error while creating Appointment');
  }
});

async function addAppointmentToRSP(appointmentId, specificUserId, userType) {
  let query =
    userType === UserType.RSP
      ? new Parse.Query('RSP')
      : new Parse.Query('Customer');
  const specificUser = await query.get(specificUserId);
  let userAppointments = specificUser.get('appointments')
    ? specificUser.get('appointments')
    : new Array();
  userAppointments.push(appointmentId);
  specificUser.set('appointments', userAppointments);
  await specificUser.save();
}
