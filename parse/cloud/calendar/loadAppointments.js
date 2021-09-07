/* eslint-disable radix */
/* eslint-disable no-undef */

const { UserType } = require('../utils/constants.js');
const {
  createCustomAppointmentsForAgenda,
} = require('../utils/createCustomAppointmentsForAgenda.js');

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
    return (
      appointmentYear === year &&
      (appointmentMonth === month ||
        appointmentMonth === month + 1 ||
        appointmentMonth === month - 1)
    );
  });
  const customAppointmentsArr = await createCustomRSPAppointments(
    appointmentsArr
  );
  return await createCustomAppointmentsForAgenda(
    customAppointmentsArr,
    year,
    month
  );
});

async function createCustomRSPAppointments(appointmentsArr) {
  let customAppointments = await Promise.all(
    appointmentsArr.map(async (appointment) => {
      const { date, startTime, endTime, appointmentType, title, description } =
        appointment.attributes;
      const appointmentId = appointment._getId();
      return {
        appointmentId,
        date,
        startTime,
        endTime,
        appointmentType,
        title,
        description,
      };
    })
  );
  return customAppointments;
}
