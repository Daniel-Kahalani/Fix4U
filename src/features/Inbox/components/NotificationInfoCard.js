import React from 'react';
import { View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Spacer from '../../../components/utils/Spacer';
import Text from '../../../components/utils/Text';

// import {
//   RestaurantCard,
//   RestaurantCardCover,
//   Info,
//   Rating,
//   Icon,
//   Address,
// } from './RestaurantInfoCardStyles';

export default function NotificationInfoCard({ restaurant = {} }) {
  //   const { name, icon, photos, address, isOpenNow, rating, placeId } =
  //     restaurant;

  //   const ratingArray = Array.from(new Array(Math.floor(rating)));

  return null;
  // <RestaurantCard elevation={2}>
  //   <View>
  //     <Favorite restaurant={restaurant} />
  //     <RestaurantCardCover key={name} source={{ uri: photos[0] }} />
  //   </View>
  //   <Info>
  //     <Text variant='label'>{name}</Text>
  //     <Rating>
  //       {ratingArray.map((elem, i) => (
  //         <SvgXml
  //           key={`star-${placeId}-${i}`}
  //           xml={star}
  //           width={20}
  //           height={20}
  //         />
  //       ))}
  //       <Spacer position='left' size='auto'>
  //         {isOpenNow ? (
  //           <SvgXml xml={open} width={20} height={20} />
  //         ) : (
  //           <Text variant='error'>CLOSED TEMPORARILY</Text>
  //         )}
  //       </Spacer>
  //       <Spacer position='left' size='large'>
  //         <Icon source={{ uri: icon }} />
  //       </Spacer>
  //     </Rating>
  //     <Address>{address}</Address>
  //   </Info>
  // </RestaurantCard>
}
