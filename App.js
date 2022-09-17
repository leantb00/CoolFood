import React from "react";
import LoginScreen from "./components/GoogleButton";
import { StyleSheet, View } from "react-native";
import Dont from "./components/Dont";
import Login from "./components/Login";
import Logo from "./components/Logo";
//import SignUp from "./components/SignUp";
import Welcome from "./components/Welcome";
import Background from "./components/Background";

export default function App() {
 
  
  return (
    
    <View style={styles.container}>
      <Background/>
      <Logo />
      <Welcome />
      <Login />
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
