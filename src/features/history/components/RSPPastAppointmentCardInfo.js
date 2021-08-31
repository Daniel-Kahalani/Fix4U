import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { Divider, List } from 'react-native-paper';
// import { CapitalizeListItem } from '../styles/pastAppointmentStyles';

export default function RSPPastAppointmentCardInfo({ pastAppointment }) {
  const { description, customerFeedback, isFeedbacked } = pastAppointment;

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
      {isFeedbacked && (
        <>
          <Divider />
          <List.Accordion
            title='Customer Feedback'
            left={(props) => (
              <List.Icon {...props} icon='clipboard-text-outline' />
            )}
            expanded={expandRSPInfo}
            onPress={() => setExpandRSPInfo(!expandRSPInfo)}
          >
            <List.Item title='Rating' description={customerFeedback.rating} />
            <Divider />
            <List.Item
              title='Description'
              description={customerFeedback.description}
            />
            <Divider />
          </List.Accordion>
        </>
      )}
    </ScrollView>
  );
}
