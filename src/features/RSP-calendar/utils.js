import { rspAppointmentTypeArr } from '../../infrastructure/utils/constants';

export const convertDateToString = (value) => {
  const year = value.getFullYear();
  const month = value.getMonth() + 1;
  const day = value.getDate();
  return (
    year +
    '-' +
    (month > 9 ? month : '0' + month) +
    '-' +
    (day > 9 ? day : '0' + day)
  );
};

export const convertTimeToString = (value) => {
  return (
    value.getHours() +
    ':' +
    (value.getMinutes() > 9 ? value.getMinutes() : '0' + value.getMinutes())
  );
};

export const createAppointmentTypeArray = () => {
  let appointmentTypeArray = [];
  rspAppointmentTypeArr.forEach((element) => {
    if (element.name !== 'Customer') {
      appointmentTypeArray.push({ label: element.name, value: element.name });
    }
  });
  return appointmentTypeArray;
};

export const convertTimeToNum = (time) => {
  const hourStr = time.split(':')[0];
  const minutesStr = time.split(':')[1];
  let hourNum = parseInt(hourStr, 10);
  let minutesNum = parseInt(minutesStr, 10) === 30 ? 0.5 : 0;
  return hourNum + minutesNum;
};
