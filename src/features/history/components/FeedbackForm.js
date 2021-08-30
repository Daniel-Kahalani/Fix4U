import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { HelperText } from 'react-native-paper';
import Loader from '../../../components/utils/Loader';
import Spacer from '../../../components/utils/Spacer';
import Text from '../../../components/utils/Text';
import RNPickerSelect from 'react-native-picker-select';

import {
  FeedbackInput,
  ErrorContainer,
  SubmitButton,
} from '../styles/feedbackStyles';

const pickerSelectStyles = StyleSheet.create({
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderRadius: 8,
    color: 'black',
    paddingRight: 30,
  },
  placeholder: {
    color: 'black',
  },
});

export default function FeedbackForm({ handleSubmitFeedback }) {
  const ratings = [
    { label: '1', value: 1 },
    { label: '2', value: 2 },
    { label: '3', value: 3 },
    { label: '4', value: 4 },
    { label: '5', value: 5 },
  ];
  const { error, loading } = useSelector((state) => state.history);
  const [rating, setRating] = useState(null);

  const [description, setDescription] = useState('');

  const [errorCheck, setErrorCheck] = useState(false);

  const hasInputErrors = () => {
    return !rating || !description;
  };

  const handleSubmitButtonPress = () => {
    setErrorCheck(true);
    if (!hasInputErrors()) {
      handleSubmitFeedback({ rating, description });
    }
  };

  return (
    <>
      <RNPickerSelect
        placeholder={{
          label: 'Choose a rating...',
          value: null,
          color: 'black',
        }}
        items={ratings}
        onValueChange={(value) => setRating(value)}
        style={pickerSelectStyles}
        useNativeAndroidPickerStyle={false}
        value={rating}
      />
      <HelperText type='error' visible={errorCheck && !rating}>
        Must select a rating!
      </HelperText>
      <Spacer size='large'>
        <FeedbackInput
          label='Description'
          value={description}
          textContentType='none'
          keyboardType='default'
          autoCapitalize='none'
          multiline
          numberOfLines={5}
          onChangeText={(u) => setDescription(u)}
        />
        <HelperText type='error' visible={errorCheck && !description}>
          Must enter a description!
        </HelperText>
      </Spacer>
      {error && (
        <ErrorContainer size='large'>
          <Text variant='error'>{error.message}</Text>
        </ErrorContainer>
      )}
      <Spacer size='large'>
        {!loading ? (
          <SubmitButton
            icon='send'
            mode='contained'
            onPress={handleSubmitButtonPress}
          >
            Submit
          </SubmitButton>
        ) : (
          <Loader />
        )}
      </Spacer>
    </>
  );
}
