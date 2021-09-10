import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { CapitalizeListItem } from '../styles/pastAppointmentStyles';

export default function CustomerPastAppointmentCardInfo({ pastAppointment }) {
  const { description, rsp } = pastAppointment;
  const [expandTechnicalInfo, setExpandTechnicalInfo] = useState(false);
  const [expandRSPInfo, setExpandRSPInfo] = useState(false);

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
        title='Servies Provider Info'
        left={(props) => <List.Icon {...props} icon='account-details' />}
        expanded={expandRSPInfo}
        onPress={() => setExpandRSPInfo(!expandRSPInfo)}
      >
        <CapitalizeListItem title='Name' description={rsp.rspName} />
        <Divider />
        <CapitalizeListItem
          title='Rating'
          description={`${rsp.rating} (${rsp.votes} vote${
            rsp.votes > 1 ? 's' : ''
          })`}
        />
        <Divider />
        <List.Item title='Visit Cost' description={rsp.visitCost} />
        <Divider />
        <CapitalizeListItem
          title='Expetise'
          description={rsp.expertise.join(', ')}
          descriptionNumberOfLines={10}
        />
        <Divider />
      </List.Accordion>
    </ScrollView>
  );
}
