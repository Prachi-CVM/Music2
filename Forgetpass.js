import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Forgetpass = () => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const navigation = useNavigation();

  const handleResetPassword = async () => {
    const storedUser = await AsyncStorage.getItem(email);
    if (!storedUser) {
      Alert.alert('Error', 'No account found with this email.');
      return;
    }

    const userData = JSON.parse(storedUser);
    userData.password = newPassword;
    await AsyncStorage.setItem(email, JSON.stringify(userData));
    Alert.alert('Success', 'Password reset successfully.');
    navigation.replace('HomeScreen');
  };

  return (
    <View style={styles.container}>
      <TextInput style={styles.input} placeholder="Enter your email" value={email} onChangeText={setEmail} />
      <TextInput style={styles.input} placeholder="Enter new password" secureTextEntry value={newPassword} onChangeText={setNewPassword} />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Reset Password</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({ /* Same styles as LoginScreen */ });

export default Forgetpass;
