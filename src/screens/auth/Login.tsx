import React, { useState, useContext} from "react";
import { StatusBar } from "expo-status-bar";


import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { supabase } from "../../initSupabase";
import { AuthStackParamList,  } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { showMessage, hideMessage } from "react-native-flash-message";

import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import auth from "../../services/auth";
import Storage from "../../utils/Storage";
import { AxiosError } from "axios";
import { AuthContext } from '../../provider/AuthProvider';

export default function ({
  navigation,
}: NativeStackScreenProps<any>) {
  const { isDarkmode, setTheme } = useTheme();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const authCont = useContext(AuthContext);

  async function login() {
    setLoading(true);
    try{
      let data = {
        username:name,
        password
      }
      console.log('data || ', data)
      const response = await auth.Login(data);
      setLoading(false);
      if(response.data.token){
        Storage.setToken(response.data.token)
        showMessage({
          message: "Login Sucessfull",
          type: "success",
        });  
        authCont.setUser(true)
        // navigation.navigate("MainTabs");
      } else {
        throw Error(response.data.msg);
      }
      

    } catch(e){
      if(e instanceof AxiosError){
        setLoading(false);
        showMessage({
          message: e.response ? e.response.data.msg : 'Nao deu Certo Register, Verifique os Dados',
          type: "danger",
        });
      } else{
        showMessage({
          message: "Nao deu Certo logar Verifique Dados de usuario e Senha.",
          type: "danger",
        });
      }
      
    }
  }

  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
       
        
          <View
            style={{
              flex:1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? "#FFFFFF" : themeColor.white,
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: 580,
                width: 415,
              }}
              source={require("../../../assets/images/login0.jpg")}
            />
          </View>
          <View
            style={{
              
              paddingHorizontal: 10,
              paddingBottom: 50,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
            }}
          >
            <Text
              fontWeight="bold"
              style={{
                alignSelf: "center",
                padding: 10,
                color:"#ffa500",
                fontSize: 25
              }}
              size="h3"
            >
              Bem vindo ao Coolfood
            </Text>
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="email"
              value={name}
              autoCapitalize="none"
              autoComplete='off'
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setName(text)}
            />


            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Senha"
              value={password}
              autoCapitalize="none"
              autoComplete='off'
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />
            <Button color="#9acd32"
              text={loading ? "Loading" : "Entrar"}
              
              onPress={() => {
                login();
              }}
              style={{
                marginTop: 20,
                borderRadius: 20,
                marginBottom: 15,
                
                
              }}
              disabled={loading}
            />

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 15,
                justifyContent: "center",
                
              }}
            >
              <Text  size="md">Não tem uma conta? </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Register");
                }}
              >
                <Text fontWeight="bold" size="md" style={{ color: "#9acd32" }}>Cadastre-se</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
                justifyContent: "center",
              }}
            >
              <TouchableOpacity 
                onPress={() => {
                  navigation.navigate("ForgetPassword");
                }}
              >
                <Text size="md" fontWeight="bold" style={{ color: "#9acd32" }}>Esqueceu a senha?</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 30,
                justifyContent: "center",
              }}
            >
           
            </View>
          </View>
        
      </Layout>
    </KeyboardAvoidingView>
  );
}
