import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Camera } from 'expo-camera';

import { View, TouchableOpacity } from 'react-native';
import Text from '../../../components/utils/Text';
import { savePhoto } from '../../account/slices/userSlice';
import { ProfileCamera, InnerSnap } from '../components/cameraStyles';

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();
  const dispatch = useDispatch();

  const snap = async () => {
    if (cameraRef) {
      const photo = await cameraRef.current.takePictureAsync();
      dispatch(savePhoto(photo));
      navigation.goBack();
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <ProfileCamera
      ref={(camera) => (cameraRef.current = camera)}
      type={Camera.Constants.Type.front}
    >
      <TouchableOpacity onPress={snap}>
        <InnerSnap />
      </TouchableOpacity>
    </ProfileCamera>
  );
}
