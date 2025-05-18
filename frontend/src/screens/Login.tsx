import React from 'react';
import { SafeAreaView, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { googleSignIn, useConfigureGoogleSignIn } from '../services/authService';
import { BASE_URL } from '@env';

const LoginScreen = () => {
  useConfigureGoogleSignIn();

  const handleSignIn = async () => {
    const serverAuthCode = await googleSignIn();
    if (serverAuthCode != null) {
      console.log('Signed in user with serverAuthCode:', serverAuthCode);
      await fetch(`${BASE_URL}oauth/token?code=${serverAuthCode}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('API response:', data);
        })
        .catch((error) => {
          console.error('Error during API call:', error);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.googleButton} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  buttonContainer: {
    paddingHorizontal: 32,
  },
  googleButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});

export default LoginScreen;
