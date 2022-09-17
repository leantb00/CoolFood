import React from 'react';
import { Image,  StyleSheet, Text, View } from 'react-native';
import logo from '../assets/background.png'; 

export default function App() {
  return (
    <View style={styles.container}>
      <Image source={logo} style={{ width: 648, height: 580 }} mageStyle= 
{{opacity:0.5}} /> 

     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.7
    
  },
});
