import React from 'react';
import { Text, Image } from 'react-native';
import RspExtendedInfoCard from './RspExtendedInfoCard';
import Spacer from '../../../components/utils/Spacer';

import {
  RSPCard,
  Info,
  Rating,
  CardContainer,
  RSPAvatarContainer,
  Title,
  InfoContainer,
} from './SearchStyles';
import RSPText from '../styles/searchResultStyles';
import star from '../../../../assets/star';
import { SvgXml } from 'react-native-svg';

export default function RSPInfoCard({ rsp, isFullDisplay, searchInput }) {
  const { businessName, fullName, rating, visitCost, businessAddress } = rsp;
  let i = 0;
  const ratingArray = Array.from(new Array(Math.round(rating)));
  if (searchInput) {
  }
  return (
    <RSPCard elevation={2}>
      <CardContainer>
        <RSPAvatarContainer>
          <Title>{businessName}</Title>
        </RSPAvatarContainer>
        <InfoContainer>
          <Info>{`RSP Name: ${fullName}`}</Info>
          <Info>{`Business Address: ${businessAddress}`}</Info>
          <Info>{`Visit Cost: ${visitCost}`}</Info>
          <Rating>
            {ratingArray.map(() => (
              <SvgXml xml={star} width={20} height={20} key={++i} />
            ))}
          </Rating>
        </InfoContainer>
      </CardContainer>
      {isFullDisplay && (
        <>
          <Spacer size='large'>
            <RspExtendedInfoCard
              rsp={rsp}
              isFullDisplayed={true}
              searchInput={searchInput}
            />
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
