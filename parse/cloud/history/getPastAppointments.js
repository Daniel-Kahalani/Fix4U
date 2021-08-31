/* eslint-disable no-undef */
const {
  AppointmentStatus,
  AppointmentType,
  UserType,
} = require('../utils/constants');

Parse.Cloud.define('getPastAppointments', async (request) => {
  const { specificUserId, userType } = request.params;
  const query = new Parse.Query('Appointment');
  query.equalTo(
    userType === UserType.RSP ? 'rspID' : 'customerID',
    specificUserId
  );
  query.lessThanOrEqualTo('createdAt', new Date());
  query.equalTo('status', AppointmentStatus.APPROVED);
  query.equalTo('appointmentType', AppointmentType.CUSTOMER);
  query.descending('createdAt');
  const pastAppointments = await query.find();
  return userType === UserType.RSP
    ? createRSPPastAppointments(pastAppointments)
    : await createCustomerPastAppointments(pastAppointments);
});

function createRSPPastAppointments(pastAppointments) {
  let resultsData = pastAppointments.map((pastAppointment) => {
    const { createdAt, updatedAt, ...pastAppointmentData } =
      pastAppointment.attributes;
    return {
      appointmentId: pastAppointment.id,
      ...pastAppointmentData,
    };
  });

  return resultsData;
}

async function createCustomerPastAppointments(pastAppointments) {
  let resultsData = await Promise.all(
    pastAppointments.map(async (pastAppointment) => {
      const { createdAt, updatedAt, ...pastAppointmentData } =
        pastAppointment.attributes;
      const { rspID } = pastAppointment.attributes;
      const query = new Parse.Query('RSP');
      const rsp = await query.get(rspID);
      const {
        rating,
        votes,
        visitCost,
        fullName: rspName,
        businessName,
        expertise,
      } = rsp.attributes;

      return {
        appointmentId: pastAppointment.id,
        ...pastAppointmentData,
        rating,
        votes,
        visitCost,
        rspName,
        businessName,
        expertise,
      };
    })
  );
  return resultsData;
}
