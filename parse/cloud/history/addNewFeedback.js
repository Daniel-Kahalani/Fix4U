/* eslint-disable no-undef */

Parse.Cloud.define('addNewFeedback', async (request) => {
  const {
    appointmentId,
    rspId,
    rspName,
    customerId,
    customerName,
    rating,
    description,
  } = request.params;
  const Feedback = new Parse.Object('Feedback');
  Feedback.set({
    appointmentId,
    rspId,
    rspName,
    customerId,
    customerName,
    rating,
    description,
  });
  await Feedback.save();
  await updateAppointmentToFeedbacked(appointmentId);
  await updateRSPRating(rspId, rating);
});

async function updateAppointmentToFeedbacked(appointmentId) {
  const query = new Parse.Query('Appointment');
  const appointment = await query.get(appointmentId);
  appointment.set({ isFeedbacked: true });
  await appointment.save();
}

async function updateRSPRating(rspId, feedbackRating) {
  const query = new Parse.Query('RSP');
  const rsp = await query.get(rspId);
  const { votes, rating } = rsp.attributes;
  const newRating = (rating * votes + feedbackRating) / (votes + 1);
  rsp.set({ votes: votes + 1, rating: newRating });
  await rsp.save();
}
