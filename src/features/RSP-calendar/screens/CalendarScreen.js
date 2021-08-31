import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, Portal } from 'react-native-paper';
import RSPAgenda from '../components/RSPAgenda.js';
import { colors } from '../../../infrastructure/theme/colors.js';
import { useDispatch } from 'react-redux';
import { loadAppointments } from '../slices/calendarSlice.js';

export default function CalendarScreen({ route, navigation }) {
  const dispatch = useDispatch();

  const loadRSPAppointments = async (year, month) => {
    return await dispatch(loadAppointments({ year, month }));
  };

  return (
    <Portal.Host>
      <View style={styles.agenda}>
        <RSPAgenda handleLoadAppointments={loadRSPAppointments} />
        <FAB
          style={styles.fab}
          small
          color={colors.brand.secondary}
          icon='plus'
          onPress={() => {
            navigation.navigate('AddAppointment');
          }}
        />
      </View>
    </Portal.Host>
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
