import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  ImageBackground,
  Platform,
  Pressable,
  SafeAreaView,
  Keyboard,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Loginstyle from '../Css/Loginstyle';
import Background from '../images/bgLogin.png';
import Countrycode from '../component/Codenumber';
import OTPinput from '../component/OTPinput';

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentPhase, setCurrentPhase] = useState(1);
  const [otpCode, setOTPCode] = useState('');
  const [isPinReady, setIsPinReady] = useState(false);
  const maximumCodeLength = 6;

  const nextPhase = () => {
    if (currentPhase < 2) {
      setCurrentPhase(currentPhase + 1);
    }
  };

  const prevPhase = () => {
    if (currentPhase > 1) {
      setOTPCode('');
      setCurrentPhase(currentPhase - 1);
    }
  };

  const requestOTP = () => {
    // Perform login logic here, such as sending the phone number to a server
    // for verification and generating an OTP.
    console.log(`Logging in with phone number: ${phoneNumber}`);
    nextPhase();
  };

  const checkOTP = () => {
    console.log('check OTP');
  };

  const handleHelp = () => {
    console.log('Help button');
  };

  const handleContract = () => {
    console.log('Contract support');
  };

  const renderPhase = () => {
    switch (currentPhase) {
      case 1:
        return (
          <View style={Loginstyle.form_container}>
            <View style={Loginstyle.input_container}>
              <Text style={Loginstyle.input_label}>เบอร์โทรศัพท์</Text>
              <View style={Loginstyle.input_box}>
                <Countrycode />
                <View style={Loginstyle.vertical_line}></View>
                <TextInput
                  style={Loginstyle.input_text}
                  onChangeText={text => setPhoneNumber(text)}
                  value={phoneNumber}
                />
              </View>
            </View>

            <TouchableOpacity
              style={Loginstyle.request_container}
              onPress={requestOTP}>
              <Text style={Loginstyle.request_text}>ขอเลข OTP</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={Loginstyle.help_container}
              onPress={handleHelp}>
              <Text style={Loginstyle.help_text}>มีปัญหาในการเข้าใช้</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={handleContract}>
              <Text style={Loginstyle.contract_text}>ติดต่อเรา</Text>
            </TouchableOpacity>
          </View>
        );
      case 2:
        return (
          <Pressable
            style={Loginstyle.form_container}
            onPress={Keyboard.dismiss}>
            <View style={Loginstyle.input_container}>
              <Text style={Loginstyle.input_label}>ยืนยันเบอร์โทรศัพท์</Text>
              <Text>ใส่เลข OTP ที่ได้ส่งไปยังเบอร์ {phoneNumber}</Text>
              <OTPinput
                code={otpCode}
                setCode={setOTPCode}
                maximumLength={maximumCodeLength}
                setIsPinReady={setIsPinReady}
              />
            </View>

            <TouchableOpacity
              style={Loginstyle.request_container}
              onPress={checkOTP}>
              <Text style={Loginstyle.request_text}>ยืนยัน</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={Loginstyle.request_again}
              onPress={requestOTP}>
              <Text style={Loginstyle.requestagain_text}>ขอ OTP อีกครั้ง</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={prevPhase}>
              <Text style={Loginstyle.contract_text}>ย้อนกลับ</Text>
            </TouchableOpacity>
          </Pressable>
        );
      default:
        return null;
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={{height: '100%'}}>
        <SafeAreaView>
          <View style={{flexDirection: 'column', flexBasis: 'auto'}}>
            <View style={Loginstyle.head_container}>
              <Text style={Loginstyle.head1_text}>สวัสดี! ขอต้อนรับสู่</Text>
              <Text style={Loginstyle.head2_text}>พร้อมกิน</Text>
            </View>
            {renderPhase()}
          </View>
        </SafeAreaView>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default LoginPage;
