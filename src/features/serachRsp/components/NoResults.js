import React from 'react';
import { RefreshControl } from 'react-native';
import LottieView from 'lottie-react-native';
import {
  RefreshScrollView,
  AnimationContainer,
  AnimationWrapper,
  AnimationMsg,
  MsgContainer,
} from '../../serachRsp/styles/searchResultStyles';

export default function NoResults({ refreshing, handelRefresh }) {
  return (
    <>
      <RefreshScrollView
        refreshControl={
          <RefreshControl
            refreshing={refreshing} /*onRefresh={handelRefresh} */
          />
        }
      />
      <AnimationContainer>
        <AnimationWrapper>
          <LottieView
            key='animation'
            autoPlay
            loop={false}
            source={require('../../../../assets/animations/no_history.json')}
          />
        </AnimationWrapper>
        <MsgContainer>
          <AnimationMsg>There is no RSP available</AnimationMsg>
        </MsgContainer>
      </AnimationContainer>
    </>
  );
}
