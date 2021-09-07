/* eslint-disable no-shadow */
import React from 'react';
import { useDispatch } from 'react-redux';
import { Button, Paragraph, Dialog } from 'react-native-paper';
import { deleteAppointment, loadAppointments } from '../slices/calendarSlice';

export const RemoveAppointmentDialog = ({
  isVisible,
  setVisible,
  appointmentId,
}) => {
  const title = 'Delete Appointment';
  const message = 'Are you sure you want to delete this appointment ?';

  const dispatch = useDispatch();

  const deleteRSPAppointment = async (appointmentId) => {
    await dispatch(deleteAppointment({ appointmentId }));
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1;
    await dispatch(loadAppointments({ year, month }));
    console.log(`loading appointments... ${year}, ${month}`);
  };

  const handleDeleteButtonClick = () => {
    setVisible(!isVisible);
    deleteRSPAppointment(appointmentId);
  };

  const handleCancelButtonClick = () => {
    setVisible(!isVisible);
  };

  return (
    <Dialog visible={isVisible} onDismiss={() => setVisible(false)}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content>
        <Paragraph>{message}</Paragraph>
      </Dialog.Content>
      <Dialog.Actions>
        <Button onPress={handleDeleteButtonClick}>Delete</Button>
        <Button onPress={handleCancelButtonClick}>Cancel</Button>
      </Dialog.Actions>
    </Dialog>
  );
};
