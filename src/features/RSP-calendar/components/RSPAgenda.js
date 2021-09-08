/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Agenda } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import Spacer from '../../../components/utils/Spacer.js';
import { AppointmentCard } from './AppointmentCard.js';
import { EmptyDateContainer, Title } from '../styles/RSPAgendaStyles.js';
import { loadAppointments } from '../slices/calendarSlice.js';

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

export default function RSPAgenda() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loadedMonth, setLoadedMonth] = useState(new Date().getMonth() + 1);
  const [loadedYear, setLoadedYear] = useState(new Date().getFullYear());
  const [refreshing, setRefreshing] = useState(false);
  const [isAgendaVisible, setIsAgendaVisible] = useState(true);
  const { appointments } = useSelector((state) => state.calendar);

  const dispatch = useDispatch();

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    loadRSPAppointments(loadedYear, loadedMonth);
    setRefreshing(false);
  }, [dispatch]);

  const loadRSPAppointments = async (year, month) => {
    await dispatch(loadAppointments({ year, month }));
  };

  const dayChange = (day) => {
    const { year, month } = day;
    if (
      (loadedYear !== year ||
        parseInt(loadedMonth, 10) > parseInt(month, 10) + 1 ||
        parseInt(loadedMonth, 10) < parseInt(month, 10) - 1) &&
      isAgendaVisible
    ) {
      setLoadedMonth(month);
      setLoadedYear(year);
      loadRSPAppointments(loadedYear, loadedMonth);
    }
  };

  return (
    <Agenda
      loadItemsForMonth={dayChange}
      items={appointments}
      selected={selectedDate}
      onDayPress={(date) => {
        if (date !== selectedDate) {
          setSelectedDate(date);
        }
      }}
      onDayChange={dayChange}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
      pastScrollRange={24}
      futureScrollRange={24}
      onRefresh={onRefresh}
      refreshing={refreshing}
      onCalendarToggled={(flag) => setIsAgendaVisible(flag)}
    />
  );
}
