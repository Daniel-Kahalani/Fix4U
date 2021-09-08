/* eslint-disable radix */
/* eslint-disable no-undef */

const { UserType, AppointmentStatus } = require('../utils/constants.js');
const { convertDateToLongFormat } = require('../utils/convertTimeFormat.js');
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
    const appointmentStatus = appointment.get('status');
    let appointmentMonth, appointmentYear;
    if (date.length === 10) {
      appointmentMonth = parseInt(date.slice(5, 7));
      appointmentYear = parseInt(date.slice(0, 4));
    } else {
      appointmentMonth = parseInt(date.split('/')[1]);
      appointmentYear = parseInt('20' + date.split('/')[2]);
    }
    return (
      appointmentYear === year &&
      (appointmentMonth === month ||
        appointmentMonth === month + 1 ||
        appointmentMonth === month - 1) &&
      appointmentStatus === AppointmentStatus.APPROVED
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
      let {
        date,
        startTime,
        endTime,
        appointmentType,
        title,
        description,
        customerName,
        location,
      } = appointment.attributes;
      const appointmentId = appointment._getId();
      date = convertDateToLongFormat(date);
      return {
        appointmentId,
        date,
        startTime,
        endTime,
        appointmentType,
        title,
        description,
        customerName,
        location,
      };
    })
  );
  return customAppointments;
}
