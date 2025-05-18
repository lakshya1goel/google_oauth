import { useEffect } from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { WEBCLIENT_ID } from '@env';

export const useConfigureGoogleSignIn = () => {
  console.log('webClientId', WEBCLIENT_ID);
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: WEBCLIENT_ID,
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);
};

export const googleSignIn = async () => {
  try {
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    console.log(userInfo);
    return userInfo.data?.serverAuthCode;
  } catch (error: any) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      console.log('User cancelled the login flow');
      return null;
    } else if (error.code === statusCodes.IN_PROGRESS) {
      console.log('Signing in');
      return null;
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      console.log('Play services not available');
      return null;
    } else {
      console.log('Some other error happened');
      console.log(error.message);
      console.log(error.code);
      return null;
    }
  }
};
