import React, { useState } from 'react';
import { ScrollView, Text, Button, View } from 'react-native';
import { Divider, List } from 'react-native-paper';
import Spacer from '../../../components/utils/Spacer';
import {
  RSPAvatarContainer,
  AuthButton,
  SmallAuthButton,
  Rating,
} from './SearchStyles';
import star from '../../../../assets/star';
import { SvgXml } from 'react-native-svg';

export const convertAvailableHoursToString = (value) => {
  let stringOfHours = '';
  for (const hour in value) {
    stringOfHours += value.toString() + '\n';
  }
  console.log(stringOfHours);
  return stringOfHours;
};

export default function RspExtendedInfoCard({ rsp, isFullDisplayed }) {
  console.log('IN RspExtendedInfoCard');
  const { rating, rspId, visitCost, votes, availableHours, recentFeedbacks } =
    rsp;

  const [expandTechnicalInfo, setExpandTechnicalInfo] = useState(false);
  const [expandRSPInfo, setExpandRSPInfo] = useState(false);
  console.log('IN RspExtendedInfoCard recentFeedbacks = ' + recentFeedbacks);
  console.log(
    'IN RspExtendedInfoCard rating = ' + recentFeedbacks[0].get('rating')
  );
  console.log(
    'IN RspExtendedInfoCard rating = ' +
      Math.round(recentFeedbacks[0].get('rating'))
  );
  const handleSearchButtonClick = () => {};
  let i = 0;
  const ratingArray = Array.from(
    new Array(Math.round(recentFeedbacks[0].get('rating')))
  );
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
                onPress={handleSearchButtonClick(value)}
              >
                {value}
              </SmallAuthButton>
            </View>
          ))}
          descriptionNumberOfLines={15}
        />
        <Divider />
      </List.Accordion>
      {isFullDisplayed && recentFeedbacks.length !== 0 && (
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
            {/* <List.Item title='Rating' description={customerFeedback.rating} /> */}
            <Divider />
            <List.Item
              title='Recent Feedbacks:'
              description={recentFeedbacks.map((value) => (
                <View key={value}>
                  <Text>{value.get('customerName')}:</Text>

                  <Text>{value.get('description')}</Text>
                  <Rating>
                    {ratingArray.map(() => (
                      <SvgXml key={++i} xml={star} width={20} height={20} />
                    ))}
                  </Rating>
                </View>
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
