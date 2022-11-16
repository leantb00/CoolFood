import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import {
  ScrollView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Image,StyleSheet
} from "react-native";
import {
  Layout,
  Text,
  TextInput,
  Button,
  useTheme,
  themeColor,
  
} from "react-native-rapi-ui";
import { Avatar } from "@rneui/themed";
import { AuthStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import auth from "../services/auth";
import Storage from "../utils/Storage";
import { AxiosError } from "axios";
import {me} from "../services/user";
import { showMessage, hideMessage } from "react-native-flash-message";



export default function ({
  navigation,
}: NativeStackScreenProps<AuthStackParamList, "Register">) {
  const { isDarkmode, setTheme } = useTheme();
  const [user, setUser] = useState<any>({})
  const [loading, setLoading] = useState<boolean>(false);

  async function getMe(){
    try{
      const response = await me();
      console.log('response || ', response.data)
      setUser(response.data.user);
    }
    catch(e){
      if(e instanceof AxiosError){
        // setRefreshing(false)
        showMessage({
          message: e.response ? e.response.data.msg : 'Nao deu Listar os Eventos, Verifique sua conexao',
          type: "danger",
        });
      } else{
        console.log('error || ', e)
        showMessage({
          message: "Nao deu Pegar os dados de eventos.",
          type: "danger",
        });
      }
    }
  }
  useEffect(() => {
    getMe()
  }, [])
  return (
    <KeyboardAvoidingView behavior="height" enabled style={{ flex: 1 }}>
      <Layout>
        
      <View style={styles.header}></View>
          <Image style={styles.avatar} source={{uri: user.picture}}/>
          {/* <Avatar
            size={128}
            rounded
            containerStyle={{margin:5}}
            source={{uri:user.picture}}
            // key={`${chunkIndex}-${i}`}
          /> */}
          
       
          <View
            style={{
              flex: 3,
              paddingHorizontal: 20,
              paddingBottom: 20,
              backgroundColor: isDarkmode ? themeColor.dark : themeColor.white,
            }}
          >
            
          
              <Text style={styles.nome}>{user.full_name}</Text>
              <Text style={styles.email}>{user.email}</Text>
              







            
            
            <Button color="red"
              text={loading ? "Loading" : "Deletar conta"}
              onPress={() => {
                navigation.navigate("Login");
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
              text={loading ? "Loading" : "Sair"}
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
const styles = StyleSheet.create({
  header:{
    
    height:250,

    
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom:10,
    alignSelf:'center',
    position: 'absolute',
    marginTop:130
  },
  name:{
    fontSize:28,
    color: "#696969",
    fontWeight: "600"
  },
  nome:{
    fontSize:30,
    fontWeight: "600",
    textAlign:'center',
    margin: 30
  },
  email:{
    fontSize:18,
    fontWeight: "600",
    textAlign:'center',
    margin: 30
  },
  phone:{
    fontSize:18,
    fontWeight: "600",
    textAlign:'center',
    margin: 30
  },
  info:{
    fontSize:16,
    color: "#00BFFF",
    marginTop:10
  },
  description:{
    fontSize:16,
    color: "#696969",
    marginTop:10,
    textAlign: 'center'
  }
});