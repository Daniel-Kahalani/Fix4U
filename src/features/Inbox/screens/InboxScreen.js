// import React from 'react';

// export default function InboxScreen() {
//   return null;
// }

import React from 'react';
import { Colors } from 'react-native-paper';
import { TouchableOpacity, ScrollView } from 'react-native';
import NotificationInfoCard from '../components/NotificationInfoCard';
import Spacer from '../../../components/utils/Spacer';
import FadeInView from '../../../components/animations/FadeInView';
import {
  Loading,
  LoadingContainer,
  RestaurantList,
  ErrorIconContainer,
  ErorIcon,
} from '../styles/inboxStyles';
import { colors } from '../../../infrastructure/theme/colors';
import Text from '../../../components/utils/Text';

export default function InboxScreen({ navigation }) {
  return (
    <ScrollView>
      {/* {loading && (
        <LoadingContainer>
          <Loading size={50} animating={true} color={Colors.blue300} />
        </LoadingContainer>
      )}
      {error ? (
        <ErrorIconContainer>
          <ErorIcon icon='close' bg={colors.ui.error} />
          <Text variant='body'>
            Unable to load restaurants, please try again
          </Text>
        </ErrorIconContainer>
      ) : ( */}
      <RestaurantList
        data={[]}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('RestaurantDetails', {
                restaurant: item,
              })
            }
          >
            <Spacer position='bottom' size='large'>
              <FadeInView>
                <NotificationInfoCard restaurant={item} />
              </FadeInView>
            </Spacer>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.placeId}
      />
      {/* )} */}
    </ScrollView>
  );
}
