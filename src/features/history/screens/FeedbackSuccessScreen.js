import React from 'react';
import SafeArea from '../../../components/utils/SafeArea';

import {
  MainContainer,
  AnimationWrapper,
  SuccessMsg,
  MsgContainer,
} from '../styles/feedbackSuccessStyles';
import LottieView from 'lottie-react-native';

export default function EditSuccessScreen() {
  return (
    <SafeArea>
      <MainContainer>
        <AnimationWrapper>
          <LottieView
            key='animation'
            autoPlay
            loop={false}
            source={require('../../../../assets/animations/sent.json')}
          />
        </AnimationWrapper>
        <MsgContainer>
          <SuccessMsg>Your Feedback Sent Successfully</SuccessMsg>
        </MsgContainer>
      </MainContainer>
    </SafeArea>
  );
}
