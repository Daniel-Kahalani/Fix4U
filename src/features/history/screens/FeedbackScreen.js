import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  addNewFeedback,
  getPastAppointments,
  clearError,
} from '../slices/historySlice';
import { ScrollView } from 'react-native';
import FeedbackForm from '../components/FeedbackForm';
import {
  FeedbackCover,
  FormContainer,
  ScrollBackground,
  FeedbackContainer,
} from '../styles/feedbackStyles';
export default function FeedbackScreen({ route, navigation }) {
  const {
    appointmentId,
    rspID: rspId,
    rsp: { rspName },
    customerID: customerId,
    customerName,
  } = route.params;
  const dispatch = useDispatch();

  const handleSubmitFeedback = async (userFeedbackInput) => {
    const resultAction = await dispatch(
      addNewFeedback({
        appointmentId,
        rspId,
        rspName,
        customerId,
        customerName,
        ...userFeedbackInput,
      })
    );
    if (addNewFeedback.fulfilled.match(resultAction)) {
      dispatch(getPastAppointments());
      navigation.navigate('FeedbackSuccess');
    }
  };

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      dispatch(clearError());
    });
  }, [dispatch, navigation]);

  return (
    <ScrollBackground>
      <FeedbackCover />
      <ScrollView>
        <FeedbackContainer>
          <FormContainer>
            <FeedbackForm handleSubmitFeedback={handleSubmitFeedback} />
          </FormContainer>
        </FeedbackContainer>
      </ScrollView>
    </ScrollBackground>
  );
}
