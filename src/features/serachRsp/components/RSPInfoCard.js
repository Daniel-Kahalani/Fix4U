import React from 'react';
import { Text, Image } from 'react-native';
import {
  SmallTitle,
  RSPCard,
  RSPCardCover,
  Info,
  Section,
  Rating,
  SectionEnd,
  Address,
} from '../components/SearchStyles';
import star from '../../../../assets/star';
import { SvgXml } from 'react-native-svg';

export const RSPInfoCard = ({ rsp = {} }) => {
  const {
    name = 'Some RSP',
    icon,
    photos = ['http://fix4u.zapweb.co.il/img/0558/069.jpg'],
    address = '2 Stam street',
    isOpenNow = true,
    rating = 4,
    isClosedTemporarily,
  } = rsp;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <RSPCard elevation={5}>
      <RSPCardCover key={name} source={{ uri: photos[0] }} />
      <Info>
        <SmallTitle>{name}</SmallTitle>
        <Section>
          <Rating>
            {ratingArray.map(() => (
              <SvgXml xml={star} width={20} height={20} />
            ))}
          </Rating>
          <SectionEnd>
            {isClosedTemporarily && (
              <Text variant='label' style={{ color: 'red' }}>
                CLOSED TEMPORARILY
              </Text>
            )}
            <Image style={{ width: 15, height: 15 }} source={{ uri: icon }} />
          </SectionEnd>
        </Section>
        <Address>{address}</Address>
      </Info>
    </RSPCard>
  );
};
