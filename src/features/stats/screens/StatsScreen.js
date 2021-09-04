import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Button } from 'react-native';
import {
  getAvailableRSPs,
  getRSPAvailableHours,
  sendAppointmentRequest,
  getAppointmentRequestStatus,
  abortAppointmentRequest,
} from '../../serachRsp/slices/searchRSPSlice';
import Text from '../../../components/utils/Text';
import { AppointmentStatus } from '../../../infrastructure/utils/constants';

export default function StatsScreen() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.searchRSP);
  const handlePress1 = () => {
    dispatch(
      getAvailableRSPs({
        faultType: 'Appliances',
        date: '29/08/21',
      })
    );
  };

  const handlePress2 = () => {
    dispatch(
      getRSPAvailableHours({
        faultType: 'Appliances',
        date: '19/08/21',
        businessName: 'beni tech',
      })
    );
  };

  const handlePress3 = async () => {
    const resultAction = await dispatch(
      sendAppointmentRequest({
        faultType: 'Appliances',
        customerName: 'avi',
        customerId: 'gylgNmuG0R',
        // customerId: 'ryvZ69Uxxv',
        faultDescripton: 'computer EXPLODED',
        rspId: 'GxRhrf3b2U',
        // rspId: '3Ujj8LaiSI',
        date: '29/08/21',
        time: '09:00',
        location: 'tel aviv',
      })
    );
    if (sendAppointmentRequest.fulfilled.match(resultAction)) {
      let intervalId1 = setInterval(async () => {
        let result = await dispatch(getAppointmentRequestStatus());
        if (result.payload !== AppointmentStatus.PENDING) {
          clearInterval(intervalId1);
          //activate fucntions according to the result.payload (approved/rejected)
        }
      }, 6000);
      setTimeout(async () => {
        clearInterval(intervalId1);
        dispatch(abortAppointmentRequest());
      }, 50000);
    }
  };

  return (
    <View>
      <Button onPress={handlePress1} title='search all' />
      <Button onPress={handlePress2} title='search spesific' />
      <Button onPress={handlePress3} title='schedule' />

      {error && (
        <Text>
          {error.message} {error.code}
        </Text>
      )}
    </View>
  );
}

// import React from 'react';

// export default function StatsScreen() {
//   return null;
// }
