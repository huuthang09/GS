import React from 'react';
import {StyleSheet, View, Button, Text, Alert} from 'react-native';
import {GoogleSignin} from '@react-native-community/google-signin';

export default function App() {
  React.useEffect(() => {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      webClientId:
        '794306623930-a0kn3dl92np1gei0cg09dg8b633f3b2d.apps.googleusercontent.com',
      offlineAccess: true,
      forceCodeForRefreshToken: true,
    });
  }, []);

  const [user, setUser] = React.useState({
    email: '',
    name: '',
  });

  async function signIn() {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUser({
        userInfo: userInfo,
        email: userInfo.user.email,
        name: userInfo.user.familyName + ' ' + userInfo.user.givenName,
      });
      Alert.alert(
        'Welcome ' + userInfo.user.familyName + ' ' + userInfo.user.givenName,
      );
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Email: {user.email}</Text>
      <Text>Name: {user.name}</Text>
      <Button title="Sign In" style={styles.button} onPress={signIn} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 300,
    height: 50,
  },
});
