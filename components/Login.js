import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  KeyboardAvoidingView,
  TouchableOpacity
} from "react-native";
import React, { useState,useEffect }  from "react";



export default function Login() {
  //const [display, setDisplay] = useState('none');  //estado inicial
  const [email, setEmail] = useState(null);         //estado inicial
  const [user, setUser] = useState(null);           //estado inicial
  const [password, setPassword] = useState(null);   //estado inicial
  
  //Envio de formulário de login
  async function sendForm(){

    let response = await fetch('', {
      method: 'POST',                                     //O método post
      headers: {
        Accept: 'application/json',                       //Os cabeçalhos
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({                              //Os dados que serão enviados para o backend
        email: email,
        name: user,
        password: password,
        
      })
    })
  }

//let json = await response.json();                         //resposta do servidor, se o email,usuárioe senha, estão corretos
//if (json === 'error'){
//    setDisplay('flex');
//    setTimeout(()=>{setDisplay('none')},5000)



// <View> component semelhante ao div no react native
// <KeyboardAvoidingView> Este componente ajustará automaticamente sua altura, posição ou preenchimento inferior com base na altura do teclado para permanecer visível enquanto o teclado virtual é exibido.



  return (
    <KeyboardAvoidingView style={styles.inputGroup}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={text =>setEmail(text)}
          secureTextEntry
        />
      </View>
       <View style={styles.container}>                                
        <TextInput
          style={styles.input}
          placeholder="Usuário"
          onChangeText={text =>setUser(text)}
        />
       </View>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Senha"
          onChangeText={text =>setPassword(text)}
          secureTextEntry
        />
      </View>
      <View style={styles.container}>
      <TouchableOpacity style={styles.container1} onPress={()=>sendForm()}>
      <Text style={styles.signUp}>Entrar</Text>
    </TouchableOpacity>
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
    container1: {
      alignItems: "center",
      justifyContent: "center",
      marginTop: 10,
    },



    signUp: {
      fontSize: 18,
      backgroundColor: "yellowgreen",
      paddingVertical: 13,
      paddingHorizontal: 30,
      borderRadius: 20,
    }
});




