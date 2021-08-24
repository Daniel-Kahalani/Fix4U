import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { AddAppointmentModal } from '../components/AddAppointmentModal.js';
import RSPAgenda from '../components/RSPAgenda.js';
import { colors } from '../../../infrastructure/theme/colors.js';
import { useDispatch } from 'react-redux';
import { addAppointment, loadAppointments } from '../slices/calendarSlice.js';

export default function CalendarScreen() {
  const dispatch = useDispatch();

  const addNewAppointment = (appointment) => {
    dispatch(addAppointment({ ...appointment }));
  };

  const loadRSPAppointments = async (year, month) => {
    return await dispatch(loadAppointments({ year, month }));
  };

  const [isFormVisible, setFormVisible] = useState(false);

  return (
    <View style={styles.agenda}>
      <RSPAgenda handleLoadAppointments={loadRSPAppointments} />
      <AddAppointmentModal
        style={styles.modal}
        isModalVisible={isFormVisible}
        setModalVisible={setFormVisible}
        handleAddAppointment={addNewAppointment}
      />
      <FAB
        style={styles.fab}
        small
        color={colors.brand.secondary}
        icon='plus'
        onPress={() => {
          setFormVisible(true);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  agenda: {
    height: 600,
  },
  modal: {
    position: 'absolute',
    top: 50,
    right: '50',
  },
  fab: {
    position: 'absolute',
    right: 15,
    top: 490,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
