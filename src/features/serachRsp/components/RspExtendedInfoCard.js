import React, { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import {
  ErrorContainer,
  SmallAuthButton,
  Rating,
  FeedbackView,
} from './SearchStyles';
import { useNavigation } from '@react-navigation/native';
import star from '../../../../assets/star';
import { SvgXml } from 'react-native-svg';
import { sendAppointmentRequest } from '../slices/searchRSPSlice';
import ErrorText from '../../../components/utils/Text';

export default function RspExtendedInfoCard({ rsp, searchInput }) {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { availableHours, recentFeedbacks, rspId } = rsp;
  const [expandTechnicalInfo, setExpandTechnicalInfo] = useState(false);
  const [expandRSPInfo, setExpandRSPInfo] = useState(false);
  const { info } = useSelector((state) => state.user);

  const handleButtonClick = async (desiredHour) => {
    const resultAction = await dispatch(
      sendAppointmentRequest({
        customerName: info.fullName,
        faultType: searchInput.faultType,
        customerId: info.specificUserId,
        faultDescripton: searchInput.description,
        rspId: rspId,
        date: searchInput.date,
        time: desiredHour,
        location: searchInput.location,
      })
    );

    if (sendAppointmentRequest.fulfilled.match(resultAction)) {
      navigation.navigate('ReceiveAppointmentAnswer');
    } else {
      navigation.navigate('ReceiveAppointmentAnswer');
    }
  };
  let i = 0;
  const { error } = useSelector((state) => state.searchRSP);

  return (
    <ScrollView>
      <List.Accordion
        title='Available Hours'
        left={(props) => <List.Icon {...props} icon='clock' />}
        expanded={expandTechnicalInfo}
        onPress={() => setExpandTechnicalInfo(!expandTechnicalInfo)}
      >
        <List.Item
          title='Select the desired Hour:'
          description={availableHours.map((value) => (
            <View key={value}>
              <SmallAuthButton
                mode='contained'
                onPress={() => handleButtonClick(value)}
              >
                {value}
              </SmallAuthButton>
            </View>
          ))}
          descriptionNumberOfLines={15}
        />
        <Divider />
        {error && (
          <ErrorContainer size='large'>
            <ErrorText variant='error'>{error.message}</ErrorText>
          </ErrorContainer>
        )}
      </List.Accordion>
      {recentFeedbacks.length !== 0 && (
        <>
          <Divider />
          <List.Accordion
            title='Feedbacks:'
            left={(props) => (
              <List.Icon {...props} icon='clipboard-text-outline' />
            )}
            expanded={expandRSPInfo}
            onPress={() => setExpandRSPInfo(!expandRSPInfo)}
          >
            <Divider />
            <List.Item
              title='Recent Feedbacks:'
              description={recentFeedbacks.map((value) => (
                <FeedbackView key={value.get('appointmentId')}>
                  <Text>{value.get('customerName')}</Text>
                  <View>
                    <Text>{value.get('description')}</Text>
                  </View>
                  <View>
                    <Rating>
                      {Array.from(
                        new Array(Math.round(value.get('rating')))
                      ).map(() => (
                        <SvgXml key={++i} xml={star} width={20} height={20} />
                      ))}
                    </Rating>
                  </View>
                </FeedbackView>
              ))}
              descriptionNumberOfLines={60}
            />
            <Divider />
          </List.Accordion>
        </>
      )}
    </ScrollView>
  );
}
