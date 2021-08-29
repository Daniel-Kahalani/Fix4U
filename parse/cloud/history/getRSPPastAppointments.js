/* eslint-disable no-undef */
const { AppointmentStatus, AppointmentType } = require('../utils/constants');

Parse.Cloud.define('getRSPPastAppointments', async (request) => {
  const { rspId } = request.params;
  const query = new Parse.Query('Appointment');
  query.equalTo('rspID', rspId);
  query.lessThanOrEqualTo('createdAt', new Date());
  query.equalTo('status', AppointmentStatus.APPROVED);
  query.equalTo('appointmentType', AppointmentType.CUSTOMER);
  query.descending('createdAt');
  const pastAppointments = await query.find();
  return pastAppointments;
  // return pastAppointments.map((pastAppointment) => pastAppointment.attributes);
});
