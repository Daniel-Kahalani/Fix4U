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

export default function RSPAgenda() {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <Agenda
      // dummy data to check UI
      items={{
        '2021-08-10': [
          {
            startTime: '10',
            endTime: '12:30',
            clientName: 'shalom amar',
            description: 'bla bla',
          },
          {
            startTime: '13:15',
            endTime: '14:00',
            clientName: 'nir cohen',
            description: 'fix toilet',
          },
        ],
        '2021-08-11': [
          {
            startTime: '10',
            endTime: '12:30',
            clientName: 'shalom amar',
            description: 'bla bla',
          },
          {
            startTime: '13:15',
            endTime: '14:00',
            clientName: 'nir cohen',
            description: 'fix toilet',
          },
        ],
        '2021-08-12': [
          {
            startTime: '10',
            endTime: '12:30',
            clientName: 'shalom amar',
            description: 'bla bla',
          },
          {
            startTime: '13:15',
            endTime: '14:00',
            clientName: 'nir cohen',
            description: 'fix toilet',
          },
        ],
        '2021-08-13': [],
        '2021-08-14': [],
      }}
      selected={selectedDate}
      onDayPress={(day) => {
        setSelectedDate(day);
      }}
      renderItem={renderItem}
      renderEmptyDate={renderEmptyDate}
    />
  );
}
