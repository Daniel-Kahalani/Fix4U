import React, { useRef, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { savePhoto } from '../../account/slices/userSlice';
import { Camera } from 'expo-camera';
import { View, TouchableOpacity } from 'react-native';
import Text from '../../../components/utils/Text';
import { ProfileCamera, InnerSnap } from '../styles/cameraStyles';

export default function CameraScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const cameraRef = useRef();
  const dispatch = useDispatch();
  let isTaken = false;

  const snap = async () => {
    if (cameraRef && !isTaken) {
      isTaken = true;
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
