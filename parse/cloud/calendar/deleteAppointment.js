/* eslint-disable no-undef */

const { UserType } = require('../utils/constants.js');

Parse.Cloud.define('deleteAppointment', async (request) => {
  try {
    const { appointmentId, specificUserId, userType } = request.params;
    await deleteAppointmentFromRSP(appointmentId, specificUserId, userType);
    let query = new Parse.Query('Appointment');
    const appointment = await query.get(appointmentId);
    let result = await appointment.toJSON();
    await appointment.destroy({ useMasterKey: true });
    return result;
  } catch (e) {
    throw new Error('Error while deleting Appointment');
  }
});

async function deleteAppointmentFromRSP(
  appointmentId,
  specificUserId,
  userType
) {
  try {
    let query =
      userType === UserType.RSP
        ? new Parse.Query('RSP')
        : new Parse.Query('Customer');
    const specificUser = await query.get(specificUserId);
    let userAppointments = specificUser.get('appointments');
    let index = userAppointments.indexOf(appointmentId);
    userAppointments.splice(index, 1);
    specificUser.set('appointments', userAppointments);
    await specificUser.save();
  } catch (e) {
    throw new Error(e);
  }
}
