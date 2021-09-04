import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../account/slices/userSlice';
import { clearHistory } from '../../history/slices/historySlice';
import { clearInbox } from '../../inbox/slices/inboxSlice';
import { clearStats } from '../../stats/slices/statsSlices';

import {
  clearSearchRSP,
  abortAppointmentRequest,
} from '../../serachRsp/slices/searchRSPSlice';
import { UserType } from '../../../infrastructure/utils/constants';
import { colors } from '../../../infrastructure/theme/colors';
import { TouchableOpacity, ScrollView } from 'react-native';
import { List, Avatar } from 'react-native-paper';
import Spacer from '../../../components/utils/Spacer';
import {
  ScrollBackground,
  SettingCover,
  AvatarContainer,
  SettingsItem,
  Title,
} from '../styles/settingStyles';

export default function SettingsScreen({ navigation }) {
  const dispatch = useDispatch();
  const { info, photo } = useSelector((state) => state.user);
  const isRsp = info.userType === UserType.RSP ? true : false;

  const handleLogout = async () => {
    await dispatch(abortAppointmentRequest());
    await dispatch(logout());
    dispatch(clearStats());
    dispatch(clearHistory());
    dispatch(clearInbox());
    dispatch(clearSearchRSP());
  };

  return (
    <ScrollBackground>
      <SettingCover />
      <ScrollView>
        <AvatarContainer>
          <Spacer size='large'>
            <TouchableOpacity onPress={() => navigation.navigate('Camera')}>
              {photo ? (
                <Avatar.Image
                  size={180}
                  source={{ uri: photo }}
                  backgroundColor='#2182BD'
                />
              ) : (
                <Avatar.Icon
                  size={180}
                  icon='human'
                  backgroundColor={colors.brand.primary}
                />
              )}
            </TouchableOpacity>
          </Spacer>
          <Title>{info.fullName}</Title>
        </AvatarContainer>
        <List.Section>
          <SettingsItem
            title='Edit Profile'
            description='Edit your personal information'
            left={(props) => (
              <List.Icon
                {...props}
                color={colors.ui.primary}
                icon='account-edit'
              />
            )}
            onPress={() => navigation.navigate('EditPersonalProfile')}
          />
          <Spacer />
          {isRsp && (
            <SettingsItem
              title='Edit Business Profile'
              description='Edit your business information'
              left={(props) => (
                <List.Icon
                  {...props}
                  color={colors.ui.primary}
                  icon='briefcase-edit'
                />
              )}
              onPress={() => navigation.navigate('EditBusinessInfo')}
            />
          )}
          <Spacer />
          <SettingsItem
            title='Logout'
            left={(props) => (
              <List.Icon {...props} color={colors.ui.primary} icon='logout' />
            )}
            onPress={handleLogout}
          />
        </List.Section>
      </ScrollView>
    </ScrollBackground>
  );
}
