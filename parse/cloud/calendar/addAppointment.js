/* eslint-disable no-array-constructor */
/* eslint-disable no-undef */

const { UserType } = require('../utils/constants.js');

Parse.Cloud.define('addAppointment', async (request) => {
  const {
    date,
    startTime,
    endTime,
    appointmentType,
    title,
    description,
    status,
    specificUserId,
    userType,
  } = request.params;
  const Appointment = new Parse.Object('Appointment');
  Appointment.set('date', date);
  Appointment.set('startTime', startTime);
  Appointment.set('endTime', endTime);
  Appointment.set('appointmentType', appointmentType);
  Appointment.set('title', title);
  Appointment.set('description', description);
  Appointment.set('rspID', specificUserId);
  Appointment.set('status', status);
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
