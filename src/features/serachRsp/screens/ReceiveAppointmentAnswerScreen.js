import React, { useEffect } from 'react';
import SafeArea from '../../../components/utils/SafeArea';
import {
  MainContainer,
  AnimationWrapper,
  SuccessMsg,
  MsgContainer,
} from '../../history/styles/feedbackSuccessStyles';
import Spacer from '../../../components/utils/Spacer';

import LottieView from 'lottie-react-native';
import { AppointmentStatus } from '../../../infrastructure/utils/constants';
import {
  getAppointmentRequestStatus,
  abortAppointmentRequest,
} from '../slices/searchRSPSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AbortButton, BottomViewButton } from '../components/SearchStyles';
import { Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function ReceiveAppointmentAnswerScreen() {
  const dispatch = useDispatch();
  const { error, loading, appointmentStatus } = useSelector(
    (state) => state.searchRSP
  );
  const navigation = useNavigation();
  useEffect(() => {
    let intervalId1 = setInterval(async () => {
      let result = await dispatch(getAppointmentRequestStatus());
      if (result.payload !== AppointmentStatus.PENDING) {
        clearInterval(intervalId1);
      }
    }, 6000);
    setTimeout(async () => {
      clearInterval(intervalId1);
      dispatch(abortAppointmentRequest());
    }, 50000);
  }, [dispatch]);

  const handleAbortButtonClick = () => {
    abortAppointmentRequest();
    navigation.navigate('MainSearch');
  };

  return (
    <SafeArea>
      <MainContainer>
        {appointmentStatus === AppointmentStatus.PENDING ? (
          <>
            <AnimationWrapper>
              <LottieView
                key='animation'
                autoPlay
                loop={true}
                source={require('../../../../assets/animations/timer.json')}
              />
            </AnimationWrapper>

            <MsgContainer>
              <SuccessMsg>Please Wait...</SuccessMsg>
            </MsgContainer>
            <BottomViewButton>
              <AbortButton
                icon='cancel'
                mode='contained'
                onPress={() => handleAbortButtonClick()}
              >
                Abort Search
              </AbortButton>
            </BottomViewButton>
          </>
        ) : appointmentStatus === AppointmentStatus.APPROVED ? (
          <>
            <AnimationWrapper>
              <LottieView
                key='animation'
                autoPlay
                loop={true}
                source={require('../../../../assets/animations/success.json')}
              />
            </AnimationWrapper>
            <MsgContainer>
              <SuccessMsg>Appointment Approved!</SuccessMsg>
            </MsgContainer>
            <Spacer size='large'>
              <BottomViewButton>
                <AbortButton
                  icon='account-search'
                  mode='contained'
                  onPress={() => navigation.navigate('MainSearch')}
                >
                  Search for another RSP
                </AbortButton>
              </BottomViewButton>
            </Spacer>
          </>
        ) : (
          <>
            <AnimationWrapper>
              <LottieView
                key='animation'
                autoPlay
                loop={true}
                source={require('../../../../assets/animations/error.json')}
              />
            </AnimationWrapper>
            <MsgContainer>
              <SuccessMsg>Appointment Rejected!</SuccessMsg>
            </MsgContainer>
            <BottomViewButton>
              <AbortButton
                mode='contained'
                onPress={() => navigation.navigate('MainSearch')}
              >
                Try Again
              </AbortButton>
            </BottomViewButton>
          </>
        )}
      </MainContainer>
    </SafeArea>
  );
}
