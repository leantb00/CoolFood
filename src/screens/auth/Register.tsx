import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { supabase } from "../../initSupabase";
import { AuthStackParamList } from "../../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
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
import { showMessage, hideMessage } from "react-native-flash-message";
export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "Register">) {
  const { isDarkmode, setTheme } = useTheme();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  
  const [loading, setLoading] = useState<boolean>(false);

  async function register() {
    setLoading(true);
    try{
      let data = {
        name: name,
        email: email,
        phone: phone,
        password: password,
        confirmPasowrd:confirmPassword,
      }
      const response = await auth.register(data);
      setLoading(false);
      if(response.data.token){
        Storage.setToken(response.data.token)
        
        showMessage({
          message: "Cadastro Sucessfull",
          type: "success",
        });  
        navigation.navigate("Login");
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
          message: "Nao deu Certo Register Verifique Dados de usuario e Senha.",
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
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: isDarkmode ? "#17171E" : themeColor.white,
            }}
          >
            <Image
              resizeMode="contain"
              style={{
                height: 580,
                width: 415,
              }}
              source={require("../../../assets/images/logoCoolFood.png")}
            />
          </View>
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
              Cadastre-se 
            </Text>
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
            }}
          >
               <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Nome"
              value={name}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setName(text)}
            />
          
            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Email"
              value={email}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />

<TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Telefone"
              value={phone}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              // secureTextEntry={true}
              onChangeText={(text) => setPhone(text)}
            />  
          



            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Senha"
              value={password}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setPassword(text)}
            />

<TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Confirma Senha"
              value={confirmPassword}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect={false}
              secureTextEntry={true}
              onChangeText={(text) => setConfirmPassword(text)}
            />
            
            
            <Button color="#9acd32"
              text={loading ? "Loading" : "Cadastro"}
              onPress={() => {
                register();
              }}
              style={{
                marginTop: 20,
                
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
              {/*<Text size="md">Already have an account?</Text>*/}  
              <Button color="red"
              text={loading ? "Loading" : "Cancelar"}
              onPress={() => {
                navigation.navigate("Login");
              }}
              style={{
                // paddingHorizontal: 148
                width:'80%',
                flex:1,
              }}
              disabled={loading}
            />
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
