/* eslint-disable radix */
module.exports.convertTimeToNum = (time) => {
  const hourStr = time.split(':')[0];
  const minutesStr = time.split(':')[1];
  let hourNum = parseInt(hourStr, 10);
  let minutesNum = parseInt(minutesStr, 10) === 30 ? 0.5 : 0;
  return hourNum + minutesNum;
};

module.exports.convertTimeToStr = (time) => {
  const hourStr = parseInt(time, 10).toString();
  const minutesStr = Number.isInteger(time) ? '00' : '30';
  return `${hourStr}:${minutesStr}`;
};

module.exports.convertDateToLongFormat = (date) => {
  if (date.length < 10) {
    const day = parseInt(date.split('/')[0]);
    const month = parseInt(date.split('/')[1]);
    const year = parseInt(date.split('/')[2]);
    return (
      '20' +
      year +
      '-' +
      (month > 9 ? month : '0' + month) +
      '-' +
      (day > 9 ? day : '0' + day)
    );
  }
  return date;
};
