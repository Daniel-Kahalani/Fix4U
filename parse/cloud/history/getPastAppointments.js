/* eslint-disable no-undef */
const {
  AppointmentStatus,
  AppointmentType,
  UserType,
  NUM_OF_PAST_APPOINTMENTS,
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
  query.limit(NUM_OF_PAST_APPOINTMENTS);

  const pastAppointments = await query.find();
  return userType === UserType.RSP
    ? await createRSPPastAppointments(pastAppointments)
    : await createCustomerPastAppointments(pastAppointments);
});

async function createRSPPastAppointments(pastAppointments) {
  let resultsData = await Promise.all(
    pastAppointments.map(async (pastAppointment) => {
      const { createdAt, updatedAt, ...pastAppointmentData } =
        pastAppointment.attributes;
      const customerFeedback = pastAppointmentData.isFeedbacked
        ? await getCustomerFeedback(pastAppointment.id)
        : null;
      return {
        appointmentId: pastAppointment.id,
        ...pastAppointmentData,
        customerFeedback,
      };
    })
  );

  return resultsData;
}

async function getCustomerFeedback(appointmentId) {
  const query = new Parse.Query('Feedback');
  query.equalTo('appointmentId', appointmentId);
  const feedback = await query.first();
  const { rating, description } = feedback.attributes;
  return { rating, description };
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
        rsp: {
          rating,
          votes,
          visitCost,
          rspName,
          businessName,
          expertise,
        },
      };
    })
  );
  return resultsData;
}
