/* eslint-disable dot-notation */
/* eslint-disable no-array-constructor */

import React, { useState } from 'react';
import { Agenda } from 'react-native-calendars';
import Spacer from '../../../components/utils/Spacer.js';
import { AppointmentCard } from './AppointmentCard.js';
import { EmptyDateContainer, Title } from './RSPAgendaStyles.js';

const renderItem = (item) => {
  return (
    <Spacer size='large'>
      <AppointmentCard appointment={item} />
    </Spacer>
  );
};

const renderEmptyDate = () => {
  return (
    <EmptyDateContainer>
      <Title variant='label'>No appointments</Title>
    </EmptyDateContainer>
  );
};

const addEmptyDatesToAppointments = (appointmentsObj, year, month) => {
  let numOfDaysInMonth = days(month, year);
  for (let day = 1; day < numOfDaysInMonth; day++) {
    let dateKey = year + '-' + padWithZero(month) + '-' + padWithZero(day);
    if (!appointmentsObj[dateKey]) {
      appointmentsObj[dateKey] = new Array();
    }
  }
  return appointmentsObj;
};

const padWithZero = (num) => {
  return num < 10 ? '0' + num : num.toString();
};

const days = function (month, year) {
  return new Date(year, month, 0).getDate();
};

export default function RSPAgenda({ handleLoadAppointments }) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loadedMonth, setLoadedMonth] = useState(null);
  const [loadedYear, setLoadedYear] = useState(null);
  const [appointments, setAppointments] = useState({});

  const loadAppointments = (year, month) => {
    handleLoadAppointments(year, month).then((result) => {
      let appointmentsObj = {};
      const appointmentsArr = result.payload;
      for (let appointment of appointmentsArr) {
        let key = appointment['date'];
        if (!appointmentsObj[key]) {
          appointmentsObj[key] = new Array();
        }
        appointmentsObj[key].push(appointment);
      }
      appointmentsObj = addEmptyDatesToAppointments(
        appointmentsObj,
        year,
        month
      );
      setAppointments(appointmentsObj);
    });
  };

  return (
    <Agenda
      loadItemsForMonth={(date) => {
        if (loadedMonth !== date.month || loadedYear !== date.year) {
          loadAppointments(date.year, date.month);
          setLoadedMonth(date.month);
          setLoadedYear(date.year);
        }
      }}
      items={appointments}
      selected={selectedDate}
      onDayPress={(date) => {
        if (selectedDate !== date) {
          setSelectedDate(date);
        }
      }}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
    />
  );
}
