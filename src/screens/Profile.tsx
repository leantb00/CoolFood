import React, {useContext, useEffect, useState} from "react";
import { View, TouchableOpacity } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Layout, Text } from "react-native-rapi-ui";
import Storage from "../utils/Storage";
import { AuthContext } from "../provider/AuthProvider";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Avatar } from "@rneui/themed";
import {me} from "../services/user";
import { showMessage, hideMessage } from "react-native-flash-message";
import { AxiosError } from "axios";

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const [user, setUser] = useState<any>({})
  const authCont = useContext(AuthContext);
  function exit(){
    Storage.setToken('')
    authCont.setUser(false)
  }

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
  
  function goToEdit(){
    navigation.navigate('ProfileEdit')
  }
  return (
    <SafeAreaView style={{flex:1,justifyContent: "flex-start", alignItems:'center'}}>
      <Avatar
        size={128}
        rounded
        containerStyle={{margin:5}}
        source={{uri:user.picture}}
        // key={`${chunkIndex}-${i}`}
      />
      <Text>{user.full_name}</Text>
      <View style={{flex:1,width:'100%', alignItems:'center', marginTop:25}}>

        
        <TouchableOpacity onPress={goToEdit} style={{height:35, width:'100%', borderBottomColor:'black', borderWidth:.3, alignItems:'center', justifyContent:'center', marginBottom:2}} >
          <Text style={{paddingHorizontal:20}}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => exit()} style={{height:35, width:'100%', borderBottomColor:'black', borderWidth:.3, alignItems:'center', justifyContent:'center'}} >
          {/* <Text style={{paddingHorizontal:20}}>Profile</Text> */}
          <Text style={{color:'red'}}>Click here to Exit</Text>
        </TouchableOpacity>
      </View>
        
    </SafeAreaView>
  );
}
