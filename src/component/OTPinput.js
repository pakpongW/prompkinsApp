import React, {useRef, useState, useEffect} from 'react';
import {View, TextInput, Text, StyleSheet, Pressable} from 'react-native';

const OTPinput = ({code, setCode, maximumLength, setIsPinReady}) => {
  const boxArray = new Array(maximumLength).fill(0);
  const inputRef = useRef();
  const [isInputBoxFocused, setIsInputBoxFocused] = useState(false);

  useEffect(() => {
    // update pin ready status
    setIsPinReady(code.length === maximumLength);
    // clean up function
    return () => {
      setIsPinReady(false);
    };
  }, [code]);

  const handleOnPress = () => {
    // check if active change state to show 'orange' color
    setIsInputBoxFocused(true);
    inputRef.current.focus();
  };

  const handleOnBlur = () => {
    // check if not active change state to show 'gray' color
    setIsInputBoxFocused(false);
  };

  const boxDigit = (_, index) => {
    // check what digit is active now and show in splitbox_inputbox
    const emptyInput = '';
    const digit = code[index] || emptyInput;

    const isCurrentValue = index === code.length;
    const isLastValue = index === maximumLength - 1;
    const isCodeComplete = code.length === maximumLength;

    const isValueFocused = isCurrentValue || (isLastValue && isCodeComplete);

    return (
      <View
        style={[
          isInputBoxFocused && isValueFocused
            ? styles.splitbox_focus
            : styles.splitbox,
        ]}
        key={index}>
        <Text style={styles.splitbox_text}>{digit}</Text>
      </View>
    );
  };

  return (
    <View style={styles.otpcontainer}>
      <Pressable style={styles.splitbox_otpinput} onPress={handleOnPress}>
        {boxArray.map(boxDigit)}
      </Pressable>
      <TextInput
        style={styles.textinput_hidden}
        value={code}
        onChangeText={setCode}
        maxLength={maximumLength}
        ref={inputRef}
        onBlur={handleOnBlur}
      />
    </View>
  );
};

export default OTPinput;

const styles = StyleSheet.create({
  otpcontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textinput_hidden: {
    position: 'absolute',
    opacity: 0,
  },
  splitbox_otpinput: {
    width: '100%',
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
  },
  splitbox: {
    borderBottomColor: '#e5e5e5',
    borderBottomWidth: 5,
    padding: 12,
    minWidth: 50,
  },
  splitbox_text: {
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
  },
  splitbox_focus: {
    borderBottomColor: 'orange',
    borderBottomWidth: 5,
    padding: 12,
    minWidth: 50,
  },
});
