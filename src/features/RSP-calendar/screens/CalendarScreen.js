import React, {useState} from 'react';
import {View, StyleSheet } from 'react-native';
import {FAB } from 'react-native-paper';
import { AddAppointmentModal } from '../components/AddAppointmentModal.js';
import RSPAgenda from '../components/RSPAgenda.js';
import {colors} from '../../../infrastructure/theme/colors.js';


export default function CalendarScreen() {
  const [isFormVisible, setFormVisible] = useState(false);

  return(
    <View style={{height: 600 }}>
      <RSPAgenda />
      <AddAppointmentModal style={{position: 'absolute', top: '50', right:'50' }} isModalVisible={isFormVisible} setModalVisible={setFormVisible}/>
      <FAB 
        style={styles.fab}
        small
        color={colors.brand.secondary}
        icon="plus"
        onPress={()=>{setFormVisible(true)}}
      />
    </View>
  );
}


const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    right: 10,
    top: 500,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

})