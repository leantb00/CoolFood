import React from "react";
import LoginScreen from "./components/GoogleButton";
import { StyleSheet, View } from "react-native";
import Dont from "./components/Dont";
import Input from "./components/Input";
import Logo from "./components/Logo";
import SignUp from "./components/SignUp";
import Welcome from "./components/Welcome";
import Background from "./components/Background";

export default function App() {
 
  
  return (
    
    <View style={styles.container}>
      <Background/>
      <Logo />
      <Welcome />
      <Input />
      <SignUp />
      <LoginScreen/>
      <Dont />
      </View>
  );
}

const styles = StyleSheet.create({
   container: {
     flex: 1,
     justifyContent: "center",
    alignItems: "center",
    
   },
  
});
