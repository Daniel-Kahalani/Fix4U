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
    businessName = 'Some RSP',
    fullName = 'beni',
    // icon,
    // photos = ['http://fix4u.zapweb.co.il/img/0558/069.jpg'],
    isOpenNow = true,
    rating = 5,
    isClosedTemporarily,
  } = rsp;

  const ratingArray = Array.from(new Array(Math.floor(rating)));

  return (
    <RSPCard elevation={5}>
      <RSPCardCover key={businessName} />
      <Info>
        <SmallTitle>{businessName}</SmallTitle>
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
          </SectionEnd>
        </Section>
        <Address>{fullName}</Address>
      </Info>
    </RSPCard>
  );
};
