/* eslint-disable no-undef */
const { Expo } = require('expo-server-sdk');
const {
  convertTimeToNum,
  convertTimeToStr,
} = require('../utils/convertTimeFormat');

Parse.Cloud.define('scheduleAppointment', async (request) => {
  const { customerId, rspId, date, time, location, faultDescripton } =
    request.params;

  const rspQuery = new Parse.Query('RSP');
  const rsp = await rspQuery.get(rspId);

  const userQuery = new Parse.Query(Parse.User);
  userQuery.equalTo('email', rsp.get('email'));
  const user = await userQuery.first();

  const { pushTokens } = user.attributes;
  sendPushNotifications({ date, time, location }, pushTokens);
  const Appointment = new Parse.Object('Appointment');
  Appointment.set({
    rspID: rspId,
    title: 'customer appointment',
    appointmentType: 'customer',
    startTime: time,
    endTime: convertTimeToStr(convertTimeToNum(time) + 2),
    location,
    description: faultDescripton,
    customerID: customerId,
    date,
    status: 'pending',
  });
  let appointment = await Appointment.save();

  return true;
});

async function sendPushNotifications(pushData, rspPushTokens) {
  let expo = new Expo();
  const messages = createNotificationMsgs(pushData, rspPushTokens);
  const tickets = await sendTickets(expo, messages);
  await valiedtedAllNotificationsRecived(expo, tickets);
}

function createNotificationMsgs(pushData, rspPushTokens) {
  let messages = [];
  for (let pushToken of rspPushTokens) {
    if (!Expo.isExpoPushToken(pushToken)) {
      throw new Parse.Error(
        30,
        `Push token ${pushToken} is not a valid Expo push token`
      );
    }
    messages.push({
      to: pushToken,
      title: 'Fix4U',
      sound: 'default',
      body: 'Hi we got for you new appointmet offer',
      data: pushData,
    });
  }
  return messages;
}

async function sendTickets(expo, messages) {
  let chunks = expo.chunkPushNotifications(messages);
  let tickets = [];
  for (let chunk of chunks) {
    try {
      let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
      tickets.push(...ticketChunk);
    } catch (e) {
      console.log('Error while send ticket: ', e);
    }
  }
  return tickets;
}

async function valiedtedAllNotificationsRecived(expo, tickets) {
  let receiptIds = [];
  for (let ticket of tickets) {
    if (ticket.id) {
      receiptIds.push(ticket.id);
    }
  }

  let receiptIdChunks = expo.chunkPushNotificationReceiptIds(receiptIds);
  for (let chunk of receiptIdChunks) {
    let receipts = await expo.getPushNotificationReceiptsAsync(chunk);
    for (let receiptId in receipts) {
      try {
        let { status, message, details } = receipts[receiptId];
        if (status === 'ok') {
          continue;
        } else if (status === 'error') {
          console.log(`There was an error sending a notification: ${message}`);
          if (details && details.error) {
            console.log(`The error code is ${details.error}`);
          }
        }
      } catch (e) {
        console.log(`Error while validate recipt ${receiptId}`);
      }
    }
  }
}
