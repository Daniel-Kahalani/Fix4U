import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateBusinessInfo, clearError } from '../../account/slices/userSlice';
import { expertiseArr } from '../../../infrastructure/utils/constants';
import { HelperText } from 'react-native-paper';
import MultiSelect from '../../../components/utils/MultiSelect';
import Loader from '../../../components/utils/Loader';
import Spacer from '../../../components/utils/Spacer';
import Text from '../../../components/utils/Text';

import {
  ScrollBackground,
  SettingCover,
  AuthButton,
  ErrorContainer,
} from '../styles/settingStyles';
import {
  ExpertiseContainer,
  GrowConainer,
} from '../styles/editBusinessProfileStyles';

export default function EditExpertiseScreen({ navigation, route }) {
  const { info, error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [expertise, setExpertise] = useState(info.expertise);
  const [errorCheck, setErrorCheck] = useState(false);

  const hasInputErrors = () => {
    return expertise.length === 0;
  };

  const handleUpdate = async () => {
    setErrorCheck(true);
    if (!hasInputErrors()) {
      const resultAction = await dispatch(
        updateBusinessInfo({ ...route.params, expertise })
      );
      if (updateBusinessInfo.fulfilled.match(resultAction)) {
        navigation.navigate('EditSuccess');
      }
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
      <ExpertiseContainer>
        <MultiSelect
          items={expertiseArr}
          uniqueKey='name'
          onSelectedItemsChange={(selectedItems) => setExpertise(selectedItems)}
          selectedItems={expertise}
          selectText='  Pick your expertise'
          searchInputPlaceholderText='Search Expertise...'
          displayKey='name'
          submitButtonText='Submit'
          hideSubmitButton={false}
        />
        <HelperText type='error' visible={errorCheck && expertise.length === 0}>
          Must choose at least one expertise
        </HelperText>
        <GrowConainer />
        {error && (
          <ErrorContainer size='large'>
            <Text variant='error'>{error.message}</Text>
          </ErrorContainer>
        )}
        <Spacer size='large'>
          {!loading ? (
            <AuthButton icon='email' mode='contained' onPress={handleUpdate}>
              Update
            </AuthButton>
          ) : (
            <Loader />
          )}
        </Spacer>
      </ExpertiseContainer>
    </ScrollBackground>
  );
}
