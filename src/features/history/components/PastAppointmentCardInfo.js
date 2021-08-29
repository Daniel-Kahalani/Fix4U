import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { UserType } from '../../../infrastructure/utils/constants';
import { ScrollView } from 'react-native';
import { Divider, List } from 'react-native-paper';
import { CapitalizeListItem } from '../styles/pastAppointmentStyles';

export default function PastAppointmentCardInfo({ pastAppointment }) {
  const { description, rspName, rating, votes, visitCost, expertise } =
    pastAppointment;
  const {
    info: { userType },
  } = useSelector((state) => state.user);
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
      {userType === UserType.CUSTOMER && (
        <>
          <Divider />
          <List.Accordion
            title='Servie Provider Info'
            left={(props) => <List.Icon {...props} icon='account-details' />}
            expanded={expandRSPInfo}
            onPress={() => setExpandRSPInfo(!expandRSPInfo)}
          >
            <CapitalizeListItem title='Name' description={rspName} />
            <Divider />
            <CapitalizeListItem
              title='Rating'
              description={`${rating} (${votes} vote${votes > 1 ? 's' : ''})`}
            />
            <Divider />
            <List.Item title='Visit Cost' description={visitCost} />
            <Divider />
            <CapitalizeListItem
              title='Expetise'
              description={expertise.join(', ')}
              descriptionNumberOfLines={10}
            />
            <Divider />
          </List.Accordion>
        </>
      )}
    </ScrollView>
  );
}
