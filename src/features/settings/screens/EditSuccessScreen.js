import React from 'react';
import SafeArea from '../../../components/utils/SafeArea';

import {
  MainContainer,
  AnimationWrapper,
  SuccessMsg,
  MsgContainer,
} from '../styles/editSuccessStyles';
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
            source={require('../../../../assets/animations/success.json')}
          />
        </AnimationWrapper>
        <MsgContainer>
          <SuccessMsg>Your Profile Updated Successfully</SuccessMsg>
        </MsgContainer>
      </MainContainer>
    </SafeArea>
  );
}
