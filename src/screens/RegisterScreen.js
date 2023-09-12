import React from 'react';
import {View, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
import tw from 'tailwind-react-native-classnames';
import Icon from '../component/Icon';

const RegisterScreen = ({navigation}) => {
  const [step, setStep] = React.useState(1);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [nameSurname, setNameSurname] = React.useState('');
  const [idCardNumber, setIdCardNumber] = React.useState('');
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [otp, setOtp] = React.useState('');
  const [isOtpCorrect, setIsOtpCorrect] = React.useState(false);

  const handleNext = () => {
    if (step === 1) {
      if (password !== confirmPassword) {
        console.log('Passwords do not match');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      console.log('Registration complete');
    }
  };

  const handleBack = () => {
    if (step === 1) {
      navigation.navigate('LoginScreen');
    } else if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  const handleVerifyOTP = () => {
    // Simulating OTP verification
    if (otp === '123456') {
      setIsOtpCorrect(true);
      setStep(4); // Move to the completion step
    } else {
      setIsOtpCorrect(false);
      Alert.alert('Invalid OTP', 'Please enter a valid OTP.');
    }
  };

  const handleComplete = () => {
    navigation.navigate('LoginScreen');
  };

  const stepNames = [
    'Create Account',
    'Personal Infomation',
    'Verify',
    'Complete',
  ];

  const renderIcon = (stepNumber, iconName) => {
    let bgColor = 'gray';
    let iconColor = 'gray';

    if (step === stepNumber || step > stepNumber) {
      iconColor = 'white';
      bgColor = 'green';
    }

    return (
      <View style={tw`flex-1 items-center`}>
        <View
          style={[
            tw`bg-${bgColor}-500 w-9 h-9 rounded-full items-center justify-center`,
          ]}>
          <Icon name={iconName} size={20} color={iconColor} />
        </View>
      </View>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <>
            <View style={tw`w-80 mb-6`}>
              <TextInput
                style={tw`border border-gray-400 px-4 py-2 rounded`}
                placeholder="Username"
                value={username}
                onChangeText={setUsername}
              />
              <TextInput
                style={tw`border border-gray-400 px-4 py-2 rounded mt-2`}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
              <TextInput
                style={tw`border border-gray-400 px-4 py-2 rounded mt-2`}
                placeholder="Confirm Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>
            <TouchableOpacity
              style={tw`bg-green-500 px-6 py-2 rounded-full`}
              onPress={handleNext}>
              <Text style={tw`text-white font-semibold text-lg`}>Next</Text>
            </TouchableOpacity>
          </>
        );
      case 2:
        return (
          <>
            <View style={tw`w-80 mb-6`}>
              <TextInput
                style={tw`border border-gray-400 px-4 py-2 rounded`}
                placeholder="Name-Surname"
                value={nameSurname}
                onChangeText={setNameSurname}
              />
              <TextInput
                style={tw`border border-gray-400 px-4 py-2 rounded mt-2`}
                placeholder="ID Card Number"
                value={idCardNumber}
                onChangeText={setIdCardNumber}
              />
              <TextInput
                style={tw`border border-gray-400 px-4 py-2 rounded mt-2`}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
              <TextInput
                style={tw`border border-gray-400 px-4 py-2 rounded mt-2`}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <TouchableOpacity
              style={tw`bg-green-500 px-6 py-2 rounded-full`}
              onPress={handleNext}>
              <Text style={tw`text-white font-semibold text-lg`}>Next</Text>
            </TouchableOpacity>
          </>
        );
      case 3:
        return (
          <View style={tw`w-80 mb-6`}>
            <Text style={tw`text-lg mb-2`}>Enter OTP</Text>
            <TextInput
              style={tw`border border-gray-400 px-4 py-2 rounded`}
              placeholder="OTP"
              value={otp}
              onChangeText={setOtp}
            />
            <TouchableOpacity
              style={tw`bg-green-500 px-6 py-2 rounded-full mt-2`}
              onPress={handleVerifyOTP}>
              <Text style={tw`text-white font-semibold text-lg`}>
                Verify OTP
              </Text>
            </TouchableOpacity>
            {isOtpCorrect && (
              <View style={tw`mt-4`}>
                <Text style={tw`text-green-500`}>
                  OTP verification successful!
                </Text>
              </View>
            )}
          </View>
        );
      case 4:
        return (
          <View style={tw`items-center justify-center`}>
            <Text style={tw`text-3xl font-bold mb-6 text-green-500`}>
              Registration Complete!
            </Text>
            <TouchableOpacity
              style={tw`bg-green-500 px-6 py-2 rounded-full`}
              onPress={handleComplete}>
              <Text style={tw`text-white font-semibold text-lg`}>Complete</Text>
            </TouchableOpacity>
          </View>
        );
    }
  };

  return (
    <View style={tw`flex-1 bg-white p-4`}>
      <View style={tw`flex-none items-start mb-10`}>
        <TouchableOpacity style={tw`mt-4`} onPress={handleBack}>
          <Text>{step === 1 ? '< Home' : '< ' + stepNames[step - 1]}</Text>
        </TouchableOpacity>
      </View>

      <View style={tw`flex-col items-center mb-10`}>
        <Text style={tw`text-3xl font-bold mb-6`}>{stepNames[step - 1]}</Text>
        <View style={tw`flex-row mb-6`}>
          {renderIcon(1, 'user')}
          {renderIcon(2, 'info')}
          {renderIcon(3, 'phone')}
          {renderIcon(4, 'check')}
        </View>
      </View>

      <View style={tw`items-center`}>{renderStepContent()}</View>
    </View>
  );
};

export default RegisterScreen;
