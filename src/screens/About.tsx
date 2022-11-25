import React, { useState, useEffect } from "react";
import { View, Linking, FlatList, TouchableOpacity, TextInput, Alert } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import {
  Layout,
  Button,
  Text,
  TopNav,
  Section,
  SectionContent,
  useTheme,
  themeColor,
} from "react-native-rapi-ui";
import establishment from "../services/establishment"

import { getTicket } from '../services/events'
import { Input, Icon } from "@rneui/themed";
import { showMessage, hideMessage } from "react-native-flash-message";
import { Card }  from "../components/Card";
import { AxiosError } from "axios";
import * as Location from 'expo-location';
import { useFocusEffect } from "@react-navigation/native";


export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const { isDarkmode, setTheme } = useTheme();
  const [listEvents, setListEvents] = useState<any>([])
  const [searchText, setSearchText] = useState('')
  const [location, setLocation] = useState<any>(null)
  const [refreshing, setRefreshing] = useState(false)
  function onPullToRefresh(){
    getEvents()
  }

  function programSearch(text:any){
    const newList = listEvents.filter((item:any) => item.name.includes(text))
    setListEvents(newList)
  }

  async function getCupon(id_event:number){
    try{
        setRefreshing(true)
        const response = await getTicket(id_event)
        Alert.alert("Seu Cupom", "Cuidado com a Data de Expiracao\n "+response.data.code + "\n Expiracao: "+ response.data.expirationDate)
        // setEstablishment(response.data)
        setRefreshing(false)
    }catch(e){
        setRefreshing(false)
        if(e instanceof AxiosError){
            showMessage({
            message: e.response ? e.response.data.msg : 'Nao deu certo, Verifique sua conexao',
            type: "danger",
            });
        } else{
            console.log('error || ', e)
            showMessage({
            message: "Nao deu Para gerar Cupom"
            });
        }
    }

}


  useEffect(() => {
    geolocation()
  }, [])

  useEffect(() => {
    getEvents()
  }, [location])

  useFocusEffect(
    React.useCallback(() => {
      geolocation();
    }, [])
  );

  async function geolocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        showMessage({
          message: 'Permissao de Localizacao Negada',
          type: "danger",
        });
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
  }

  async function getEvents(){
    setRefreshing(true)
    try{
      const response = await establishment.getEvents()
      setRefreshing(false)
      // console.log('response || ', response)
      if(response){
        console.log('response data || ', response.data)
        // let datafiltered = response.data.sort((a:any,b:any) => a.distance-b.distance)
        setListEvents(response.data)
      }
    }catch(e){
      if(e instanceof AxiosError){
        setRefreshing(false)
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

  return (
    <Layout>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={{

            paddingBottom: 20,
          }}
          data={listEvents}
          renderItem={({ item, index }) => (
            <Card
              item={item}
              onPress={() => Alert.alert("Gerar Ticket?","lembre de salvar o ticket.", [
                {
                  text: "Sim",
                  onPress: () => getCupon(item.id)
                },
                {
                  text: "Cancel",
                  onPress: () => console.log("Cancel Pressed"),
                  style: "cancel"
                },
              ])}
              key={index}
            />
          )}
          onRefresh={() => onPullToRefresh()}
          refreshing={refreshing}
          ListEmptyComponent={
            listEvents.length == 0 ? (
              <View style={{ marginTop: 10 }}>
                <Text style={{textAlign:'center', fontSize:22, paddingTop:22}}>
                  {'Nenhum Resultado Encontrado'}
                </Text>
              </View>
            ) : null
          }
          ListHeaderComponent={
            <View>
              <View
                style={{
                  backgroundColor: "#EFEFEF",
                  borderRadius: 100,
                  width: "85%",
                  height: 45,
                  marginTop: 25,
                  justifyContent: "center",
                  alignSelf: "center",
                  flexDirection: "row",
                }}
              >
                <Input
                  leftIcon={
                    <Icon
                      name="search"
                      type="font-awesome"
                      size={18}
                      // iconStyle={{ right: 15 }}
                      onPress={() => {
                        programSearch(searchText)
                      }}
                      color="black"
                    />
                  }

                  onChangeText={(text:any) => {
                    setSearchText(text)
                    console.log("alterando Texto")
                  }}
                  value={searchText}
                  onSubmitEditing={() => {
                    programSearch(searchText);
                  }}
                  inputStyle={{
                    backgroundColor: "#EFEFEF",
                    color: "black",
                  }}
                  
                />
              </View>
              </View>
              }
                />
      </View>
    </Layout>
  );
}
