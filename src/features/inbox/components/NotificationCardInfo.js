import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { CapitalizeListItem } from '../styles/notificationStyles';
export default function NotificationCardInfo({ notification }) {
  const { customerName, location, description } = notification.attributes;
  const [expandTechnicalInfo, setExpandTechnicalInfo] = useState(false);
  const [expandCustomerInfo, setExpandCustomerInfo] = useState(false);

  return (
    <ScrollView>
      <List.Accordion
        title='Technical Info'
        left={(props) => <List.Icon {...props} icon='wrench' />}
        expanded={expandTechnicalInfo}
        onPress={() => setExpandTechnicalInfo(!expandTechnicalInfo)}
      >
        <List.Item
          title='Description'
          description={description}
          descriptionNumberOfLines={15}
        />
        <Divider />
      </List.Accordion>
      <Divider />
      <List.Accordion
        title='Customer Info'
        left={(props) => <List.Icon {...props} icon='account-details' />}
        expanded={expandCustomerInfo}
        onPress={() => setExpandCustomerInfo(!expandCustomerInfo)}
      >
        <CapitalizeListItem title='Name' description={customerName} />
        <Divider />
        <CapitalizeListItem title='Location' description={location} />
        <Divider />
      </List.Accordion>
    </ScrollView>
  );
}
