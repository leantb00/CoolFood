import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
} from "react-native";
import React from "react";


export default function Input() {
  return (
    <KeyboardAvoidingView style={styles.inputGroup}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Nome"
          onChangeText={(text) => {}}
        />
      </View>

      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text) => {}}
        />
      </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          onChangeText={(text) => {}}
          secureTextEntry
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
    
    },
    container: {
        // backgroundColor: "tomato",
        width: "100%",
        padding: 5,
    },
    input: {    
        padding: 15,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 5,
        fontSize: 18,
        borderRadius: 20,
        width: "100%"
        
        
       
        
    },
});




