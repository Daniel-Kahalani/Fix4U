import React from 'react';
import { RefreshControl } from 'react-native';
import LottieView from 'lottie-react-native';
import {
  RefreshScrollView,
  AnimationContainer,
  AnimationWrapper,
  AnimationMsg,
  MsgContainer,
} from '../styles/inboxStyles';

export default function InboxEmpty({ refreshing, handelRefresh }) {
  return (
    <>
      <RefreshScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handelRefresh} />
        }
      />
      <AnimationContainer>
        <AnimationWrapper>
          <LottieView
            key='animation'
            autoPlay
            loop={false}
            source={require('../../../../assets/animations/empty_inbox.json')}
          />
        </AnimationWrapper>
        <MsgContainer>
          <AnimationMsg>Your Inbox is Empty</AnimationMsg>
        </MsgContainer>
      </AnimationContainer>
    </>
  );
}
