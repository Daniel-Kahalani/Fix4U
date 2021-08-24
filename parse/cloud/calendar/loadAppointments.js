/* eslint-disable radix */
/* eslint-disable no-undef */

const { UserType } = require('../utils/constants.js');

Parse.Cloud.define('loadAppointmentsByMonth', async (request) => {
  const { month, year, specificUserId, userType } = request.params;
  const query = new Parse.Query('Appointment');
  const specificUserColumn = userType === UserType.RSP ? 'rspID' : 'customerID';
  query.equalTo(specificUserColumn, specificUserId);
  query.ascending('date');
  const appointmentsArr = await (
    await query.find()
  ).filter((appointment) => {
    const date = appointment.get('date');
    const appointmentMonth = parseInt(date.slice(5, 7));
    const appointmentYear = parseInt(date.slice(0, 4));
    return appointmentYear === year && appointmentMonth === month;
  });
  return await createCustomRSPAppointments(appointmentsArr);
});

async function createCustomRSPAppointments(appointmentsArr) {
  let customAppointments = await Promise.all(
    appointmentsArr.map(async (appointment) => {
      const { date, startTime, endTime, title, description } =
        appointment.attributes;
      const appointmentId = appointment._getId();
      return {
        appointmentId,
        date,
        startTime,
        endTime,
        title,
        description,
      };
    })
  );
  return customAppointments;
}
