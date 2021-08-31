/* eslint-disable no-undef */
const { AppointmentStatus, AppointmentType } = require('../utils/constants');

Parse.Cloud.define('getCustomerPastAppointments', async (request) => {
  const { customerId } = request.params;
  const query = new Parse.Query('Appointment');
  query.equalTo('customerID', customerId);
  query.lessThanOrEqualTo('createdAt', new Date());
  query.equalTo('status', AppointmentStatus.APPROVED);
  query.equalTo('appointmentType', AppointmentType.CUSTOMER);
  query.descending('createdAt');
  const pastAppointments = await query.find();
  return await createCustomerPastAppointments(pastAppointments);
});

async function createCustomerPastAppointments(pastAppointments) {
  let resultsData = await Promise.all(
    pastAppointments.map(async (pastAppointment) => {
      const { rspID } = pastAppointment.attributes;
      const query = new Parse.Query('RSP');
      const rsp = await query.get(rspID);
      const {
        rating,
        votes,
        fullName: rspName,
        businessName,
        expertise,
      } = rsp.attributes;
      const { createdAt, updatedAt, ...appointmentData } =
        pastAppointment.attributes;
      return {
        appointmentId: pastAppointment.id,
        ...appointmentData,
        rating,
        votes,
        rspName,
        businessName,
        expertise,
      };
    })
  );
  return resultsData;
}
