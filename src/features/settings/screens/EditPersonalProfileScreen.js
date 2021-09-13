import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updatePersonalInfo, clearError } from '../../account/slices/userSlice';
import { ScrollView } from 'react-native';
import EditPersonalProfileForm from '../components/EditPersonalProfileForm';
import {
  ScrollBackground,
  SettingCover,
  EditContainer,
  FormContainer,
} from '../styles/settingStyles';

export default function EditPersonalProfileScreen({ route, navigation }) {
  const dispatch = useDispatch();

  const updateInfo = async (personalInfo) => {
    const resultAction = await dispatch(updatePersonalInfo(personalInfo));
    if (updatePersonalInfo.fulfilled.match(resultAction)) {
      navigation.navigate('EditSuccess');
    }
  };

  useEffect(() => {
    navigation.addListener('beforeRemove', (e) => {
      dispatch(clearError());
    });
  }, [dispatch, navigation]);

  return (
    <ScrollBackground>
      <SettingCover />
      <ScrollView>
        <EditContainer>
          <FormContainer>
            <EditPersonalProfileForm handleUpdate={updateInfo} />
          </FormContainer>
        </EditContainer>
      </ScrollView>
    </ScrollBackground>
  );
}
