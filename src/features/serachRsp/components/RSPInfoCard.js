import React from 'react';
import { Text, Image } from 'react-native';
import RspExtendedInfoCard from './RspExtendedInfoCard';
import Spacer from '../../../components/utils/Spacer';

import {
  SmallTitle,
  RSPCard,
  RSPCardCover,
  Info,
  Section,
  Rating,
  SectionEnd,
  Address,
  CardContainer,
  RSPAvatarContainer,
  Title,
  InfoContainer,
} from './SearchStyles';
import RSPText from '../styles/searchResultStyles';
import star from '../../../../assets/star';
import { SvgXml } from 'react-native-svg';

export default function RSPInfoCard({ rsp, isFullDisplay }) {
  const { businessName, fullName, rating, rspId, visitCost, location } = rsp;
  let i = 0;
  const ratingArray = Array.from(new Array(Math.round(rating)));
  console.log('888888888888888888888888888888888888888' + location);
  return (
    <RSPCard elevation={2}>
      <CardContainer>
        <RSPAvatarContainer>
          <Title>{businessName ? businessName : 'Sagi BusinessName'}</Title>
        </RSPAvatarContainer>
        <InfoContainer>
          {/* <Title variant='label'>{businessName}</Title> */}
          <Info>{`RSP Name: ${fullName}`}</Info>
          <Info>{`visitCost: ${visitCost}`}</Info>
          <Info>{`Rsp ID: ${rspId}`}</Info>
          <Rating>
            {ratingArray.map(() => (
              <SvgXml
                xml={star}
                width={20}
                height={20}
                key={(++i).toString()}
              />
            ))}
          </Rating>
        </InfoContainer>
      </CardContainer>
      {isFullDisplay && (
        <>
          <Spacer size='large'>
            <RspExtendedInfoCard rsp={rsp} isFullDisplayed={true} />
          </Spacer>
        </>
      )}
    </RSPCard>
  );
}
/*
results structure

Array[
  Object {
    "availableHours": Array [String],
    "businessName": String,
    "fullName": String,
    "rating": Number,
    "recentFeedbacks": Array [
      Object {
        "appointmentId": String,
        "createdAt": Date,
        "customerId": String,
        "customerName": String,
        "description": String,
        "objectId": String,
        "rating": Number,
        "rspId": String,
        "rspName": String,
        "updatedAt": Date,
      },
    ],
    "rspId": "String",
    "visitCost": Number,
    "votes": Number,
}]
*/

/*
      { <Info>
          <Title variant='label'>{businessName}</Title>
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
      </CardContainer> }*/
