import React from 'react';
import { View, StyleSheet } from 'react-native';
import { FAB, Portal } from 'react-native-paper';
import RSPAgenda from '../components/RSPAgenda.js';
import { colors } from '../../../infrastructure/theme/colors.js';
import Snackbar from '../../../components/utils/Snackbar.js';
import { useDispatch, useSelector } from 'react-redux';
import { SnackBarType } from '../../../infrastructure/utils/constants.js';
import { clearRemoveAppointmentSnackbar } from '../slices/calendarSlice.js';

export default function CalendarScreen({ navigation }) {
  const { isAppointmentRemoved } = useSelector((state) => state.calendar);
  const dispatch = useDispatch();

  return (
    <Portal.Host>
      <View style={styles.agenda}>
        <RSPAgenda />
        <FAB
          style={styles.fab}
          color={colors.brand.primary}
          icon='plus'
          onPress={() => {
            navigation.navigate('AddAppointment');
          }}
        />
        <Snackbar
          visible={isAppointmentRemoved}
          style={styles.snackbar}
          type={SnackBarType.SUCCESS}
          onDismiss={() => dispatch(clearRemoveAppointmentSnackbar())}
          action={{
            label: 'Dismiss',
            onPress: () => dispatch(clearRemoveAppointmentSnackbar()),
          }}
        >
          Appointment have removed successfuly
        </Snackbar>
      </View>
    </Portal.Host>
  );
}

const styles = StyleSheet.create({
  agenda: {
    height: 600,
  },
  snackbar: {
    position: 'absolute',
    bottom: 10,
  },
  fab: {
    position: 'absolute',
    right: 15,
    top: 490,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
});
