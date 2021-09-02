/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable dot-notation */
/* eslint-disable no-array-constructor */

import React, { useState, useEffect } from 'react';
import { Agenda } from 'react-native-calendars';
import { useSelector } from 'react-redux';
import Spacer from '../../../components/utils/Spacer.js';
import { AppointmentCard } from './AppointmentCard.js';
import { EmptyDateContainer, Title } from '../styles/RSPAgendaStyles.js';

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
  const { appointments } = useSelector((state) => state.calendar);
  const [customAppointments, setCustomAppointments] = useState({});

  const createCustomAppointments = (year, month) => {
    //console.log(`loading appointments: ${year} - ${month}`);
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
      setCustomAppointments(appointmentsObj);
    });
  };

  // useEffect(() => {
  //   createCustomAppointments(loadedYear, loadedMonth);
  //   console.log(`appointments changed: ${JSON.stringify(appointments)}`);
  // }, [loadedYear, loadedMonth, appointments]);

  return (
    <Agenda
      loadItemsForMonth={(date) => {
        if (date.month !== loadedMonth) {
          //console.log(`loaded month: ${loadedMonth}`);
          //console.log(`current month: ${date.month}`);
          setLoadedMonth(date.month);
        }
        if (date.year !== loadedYear) {
          //console.log(`loaded year: ${loadedYear}`);
          //console.log(`current year: ${date.year}`);
          setLoadedYear(date.year);
        }
      }}
      items={customAppointments}
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
