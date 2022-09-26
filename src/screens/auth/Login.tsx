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

export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "Login">) {
  const { isDarkmode, setTheme } = useTheme();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  async function login() {
    setLoading(true);
    const { user, error } = await supabase.auth.signIn({
      email: email,
      password: password,
    });
    if (!error && !user) {
      setLoading(false);
      alert("Check your email for the login link!");
    }
    if (error) {
      setLoading(false);
      alert(error.message);
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
              placeholder="Nome"
              value={email}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Email"
              value={email}
              autoCapitalize="none"
              autoCompleteType="off"
              autoCorrect={false}
              keyboardType="email-address"
              onChangeText={(text) => setEmail(text)}
            />

            <TextInput
              containerStyle={{ marginTop: 15 }}
              placeholder="Senha"
              value={password}
              autoCapitalize="none"
              autoCompleteType="off"
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
