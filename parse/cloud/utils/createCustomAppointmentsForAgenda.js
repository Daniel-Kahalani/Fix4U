/* eslint-disable no-array-constructor */

module.exports.createCustomAppointmentsForAgenda = (
  appointmentsArr,
  year,
  month
) => {
  let appointmentsObj = {};
  for (
    let currMonth = (month - 1) % 12;
    currMonth <= (month + 1) % 12;
    currMonth = (currMonth + 1) % 12
  ) {
    for (let day = 1; day < daysInMonth(currMonth, year); day++) {
      let dateKey = createDateKeyFromDay(year, currMonth, day);
      appointmentsObj[dateKey] = new Array();
    }
  }

  if (appointmentsArr.length > 0) {
    appointmentsArr.sort(sortAppointmentsByStartTime);
    appointmentsArr.forEach((appointment) => {
      let key = appointment.date;
      appointmentsObj[key].push(appointment);
    });
  }
  return appointmentsObj;
};

const sortAppointmentsByStartTime = (appointment1, appointment2) => {
  const appointmentStartTime1 = createStartTimeFromAppointment(appointment1);
  const appointmentStartTime2 = createStartTimeFromAppointment(appointment2);
  if (appointmentStartTime1 > appointmentStartTime2) {
    return 1;
  }
  if (appointmentStartTime1 < appointmentStartTime2) {
    return -1;
  }
  return 0;
};

const createStartTimeFromAppointment = (appointment) => {
  const year = appointment.date.slice(0, 4);
  const month = appointment.date.slice(5, 7);
  const day = appointment.date.slice(8, 10);
  const hour = appointment.startTime.slice(0, 2);
  const minutes = appointment.startTime.slice(3, 5);
  return new Date(year, month, day, hour, minutes);
};

const padWithZero = (num) => {
  return num < 10 ? '0' + num : num.toString();
};

const daysInMonth = (month, year) => {
  return new Date(year, month, 0).getDate();
};

const createDateKeyFromDay = (year, month, day) => {
  return year + '-' + padWithZero(month) + '-' + padWithZero(day);
};
