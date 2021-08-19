import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Button } from 'react-native';
import { getAvailableRSPs } from '../../serachRsp/slices/searchRSPSlice';
import Text from '../../../components/utils/Text';
export default function HistroyScreen() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.searchRSP);
  const handlePress = () => {
    dispatch(
      getAvailableRSPs({
        faultType: 'Appliances',
        date: '08/19/21',
      })
    );
  };

  return (
    <View>
      <Button onPress={handlePress} title='search' />
      <Text>{error}</Text>
    </View>
  );
}
