import React from 'react';
import { Text } from 'react-native';

export const RSPInfo = ({ rsp = {} }) => {
  const {
    name = 'Some RSP',
    icon,
    photos = [
      'https://previews.123rf.com/images/coramax/coramax1211/coramax121100022/16389688-3d-people-man-person-with-a-wrench-businessman-and-builder-fix-it.jpg',
    ],
    address = '100 Stam street',
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily,
  } = rsp;

  return <Text>{name}</Text>;
};
