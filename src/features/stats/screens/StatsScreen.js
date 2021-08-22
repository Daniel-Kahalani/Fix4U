/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Button } from 'react-native';
import {
  getAvailableRSPs,
  getRSPAvailableHours,
  sendAppointmentRequest,
  getAppointmentRequestStatus,
  abortAppointmentRequest,
} from '../../serachRsp/slices/searchRSPSlice';
import Text from '../../../components/utils/Text';
export default function StatsScreen() {
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.searchRSP);
  const handlePress1 = () => {
    dispatch(
      getAvailableRSPs({
        faultType: 'Appliances',
        date: '19/08/21',
      })
    );
  };

  const handlePress2 = () => {
    dispatch(
      getRSPAvailableHours({
        faultType: 'Appliances',
        date: '19/08/21',
        businessName: 'johnTech',
      })
    );
  };

  const handlePress3 = async () => {
    const resultAction = await dispatch(
      sendAppointmentRequest({
        customerName: 'peri',
        customerId: 'HQB4B0T3it',
        faultDescripton: 'computer EXPLODED',
        rspId: 'VQjlJzoP2e',
        date: '19/08/21',
        time: '09:00',
        location: 'tel aviv',
      })
    );
    if (sendAppointmentRequest.fulfilled.match(resultAction)) {
      let intervalId1 = setInterval(async () => {
        let result = await dispatch(getAppointmentRequestStatus());
        if (result.payload !== 'pending') {
          clearInterval(intervalId1);
          //activate fucntions according to the result.payload (approved/rejected)
        }
      }, 6000);
      let intervalId2 = setTimeout(async () => {
        dispatch(abortAppointmentRequest());
        //activate fucntions according to the result.payload (approved/rejected)
      }, 30000);
    }
  };

  return (
    <View>
      <Button onPress={handlePress1} title='search all' />
      <Button onPress={handlePress2} title='search spesific' />
      <Button onPress={handlePress3} title='schedule' />

      {error && (
        <Text>
          {error.message} {error.code}
        </Text>
      )}
    </View>
  );
}

// import React, { Component } from 'react';
// import {
//   StyleSheet,
//   Text,
//   View,
//   TouchableOpacity,
//   Image,
//   FlatList,
// } from 'react-native';

// export default class StatsScreen extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       data: [
//         {
//           id: 3,
//           image: 'https://bootdey.com/img/Content/avatar/avatar7.png',
//           name: 'March SoulLaComa',
//           text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
//           attachment: 'https://via.placeholder.com/100x100/FFB6C1/000000',
//         },
//         {
//           id: 2,
//           image: 'https://bootdey.com/img/Content/avatar/avatar6.png',
//           name: 'John DoeLink',
//           text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
//           attachment: 'https://via.placeholder.com/100x100/20B2AA/000000',
//         },
//         {
//           id: 4,
//           image: 'https://bootdey.com/img/Content/avatar/avatar2.png',
//           name: 'Finn DoRemiFaso',
//           text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
//           attachment: '',
//         },
//         {
//           id: 5,
//           image: 'https://bootdey.com/img/Content/avatar/avatar3.png',
//           name: 'Maria More More',
//           text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
//           attachment: '',
//         },
//         {
//           id: 1,
//           image: 'https://bootdey.com/img/Content/avatar/avatar1.png',
//           name: 'Frank Odalthh',
//           text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
//           attachment: 'https://via.placeholder.com/100x100/7B68EE/000000',
//         },
//         {
//           id: 6,
//           image: 'https://bootdey.com/img/Content/avatar/avatar4.png',
//           name: 'Clark June Boom!',
//           text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
//           attachment: '',
//         },
//         {
//           id: 7,
//           image: 'https://bootdey.com/img/Content/avatar/avatar5.png',
//           name: 'The googler',
//           text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
//           attachment: '',
//         },
//       ],
//     };
//   }

//   render() {
//     return (
//       <FlatList
//         style={styles.root}
//         data={this.state.data}
//         extraData={this.state}
//         ItemSeparatorComponent={() => {
//           return <View style={styles.separator} />;
//         }}
//         keyExtractor={(item) => {
//           return item.id.toString();
//         }}
//         renderItem={(item) => {
//           const Notification = item.item;
//           let attachment = <View />;

//           let mainContentStyle;
//           if (Notification.attachment) {
//             mainContentStyle = styles.mainContent;
//             attachment = (
//               <Image
//                 style={styles.attachment}
//                 source={{ uri: Notification.attachment }}
//               />
//             );
//           }
//           return (
//             <View style={styles.container}>
//               <Image
//                 source={{ uri: Notification.image }}
//                 style={styles.avatar}
//               />
//               <View style={styles.content}>
//                 <View style={mainContentStyle}>
//                   <View style={styles.text}>
//                     <Text style={styles.name}>{Notification.name}</Text>
//                     <Text>{Notification.text}</Text>
//                   </View>
//                   <Text style={styles.timeAgo}>2 hours ago</Text>
//                 </View>
//                 {attachment}
//               </View>
//             </View>
//           );
//         }}
//       />
//     );
//   }
// }

// const styles = StyleSheet.create({
//   root: {
//     backgroundColor: '#FFFFFF',
//   },
//   container: {
//     padding: 16,
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderColor: '#FFFFFF',
//     alignItems: 'flex-start',
//   },
//   avatar: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//   },
//   text: {
//     marginBottom: 5,
//     flexDirection: 'row',
//     flexWrap: 'wrap',
//   },
//   content: {
//     flex: 1,
//     marginLeft: 16,
//     marginRight: 0,
//   },
//   mainContent: {
//     marginRight: 60,
//   },
//   img: {
//     height: 50,
//     width: 50,
//     margin: 0,
//   },
//   attachment: {
//     position: 'absolute',
//     right: 0,
//     height: 50,
//     width: 50,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#CCCCCC',
//   },
//   timeAgo: {
//     fontSize: 12,
//     color: '#696969',
//   },
//   name: {
//     fontSize: 16,
//     color: '#1E90FF',
//   },
// });
