/* eslint-disable no-undef */

Parse.Cloud.define('editAppointment', async (request) => {
  const {
    appointmentId,
    date,
    startTime,
    endTime,
    appointmentType,
    title,
    description,
  } = request.params;
  const query = new Parse.Query('Appointment');
  const Appointment = await query.get(appointmentId);
  Appointment.set('date', date);
  Appointment.set('startTime', startTime);
  Appointment.set('endTime', endTime);
  Appointment.set('appointmentType', appointmentType);
  Appointment.set('title', title);
  Appointment.set('description', description);
  try {
    let result = await (await Appointment.save()).toJSON();
    return result;
  } catch (error) {
    throw new Error('Error while updating Appointment');
  }
});
