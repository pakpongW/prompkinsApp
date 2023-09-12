import React, {useState} from 'react';
import {View, Text, Image, platform, StyleSheet} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';

const Countrycode = () => {
  const [selectedValue, setSelectedValue] = useState('Thai');

  // Define your options as an array of objects
  const options = [
    {
      value: 'Thai',
      label: 'Thai',
      code: '+66',
      picture: require('../images/thailand.png'), // Replace with your image path
    },
    {
      value: 'China',
      label: 'China',
      code: '+86',
      picture: require('../images/china.png'), // Replace with your image path
    },
    {
      value: 'Vietnam',
      label: 'Vietnam',
      code: '+84',
      picture: require('../images/vietnam.png'), // Replace with your image path
    },
  ];

  const selectedOption = options.find(option => option.value === selectedValue);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        gap: 5,
        justifyContent: 'center',
      }}>
      <RNPickerSelect
        value={selectedValue}
        onValueChange={value => setSelectedValue(value)}
        style={pickerSelectStyles}
        items={options}
      />
      {selectedOption && (
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            gap: 5,
            alignItems: 'center',
          }}>
          <Image
            source={selectedOption.picture}
            style={{width: 50, height: 50}}
          />
          <Text style={{fontSize: 16, fontWeight: 'bold', color: 'black'}}>
            {selectedOption.code}
          </Text>
        </View>
      )}
    </View>
  );
};

export default Countrycode;

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    width: 40,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  inputAndroid: {
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});
