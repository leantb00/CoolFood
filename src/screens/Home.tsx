import React, { useState, useEffect } from "react";
import { View, Platform, Linking, FlatList, TouchableOpacity, TextInput } from "react-native";
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
import user from "../services/user"
import { Input, Icon } from "@rneui/themed";
import { showMessage, hideMessage } from "react-native-flash-message";
import { Card }  from "../components/Card";
import { AxiosError } from "axios";
import * as Location from 'expo-location';
import { useFocusEffect } from "@react-navigation/native";
import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';


Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const { isDarkmode, setTheme } = useTheme();
  const [listEstablishment, setListEstablishment] = useState<any>([])
  const [searchText, setSearchText] = useState('')
  const [location, setLocation] = useState<any>(null)
  const [refreshing, setRefreshing] = useState(false)
  function onPullToRefresh(){
    getEstablishments()
  }

  async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log("Token PUSH || " + token);
      try{
        const response = await user.registerPush(token);
        
        // getEstablishment()
      } catch(e){

      }
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
  }

  function programSearch(text:any){
    const newList = listEstablishment.filter((item:any) => item.name.includes(text))
    setListEstablishment(newList)
  }


  useEffect(() => {
    registerForPushNotificationsAsync()
    geolocation()
  }, [])

  useEffect(() => {
    location?.coords && getEstablishments()
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

  async function getEstablishments(){
    setRefreshing(true)
    try{
      let coords = {lat:location.coords.latitude, long:location.coords.longitude}
      const response = await establishment.getEstablishments(coords)
      setRefreshing(false)
      // console.log('response || ', response)
      if(response){
        console.log('response data || ', response.data)
        let datafiltered = response.data.sort((a:any,b:any) => a.distance-b.distance)
        setListEstablishment(datafiltered)
      }
    }catch(e){
      if(e instanceof AxiosError){
        setRefreshing(false)
        showMessage({
          message: e.response ? e.response.data.msg : 'Nao deu Listar os Estabelecimentos, Verifique sua conexao',
          type: "danger",
        });
      } else{
        console.log('error || ', e)
        showMessage({
          message: "Nao deu Pegar os dados de estabelecimento.",
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
          data={listEstablishment}
          renderItem={({ item, index }) => (
            <Card
              item={item}
              onPress={() => navigation.navigate("Establishment",{item})}
              key={index}
            />
          )}
          onRefresh={() => onPullToRefresh()}
          refreshing={refreshing}
          ListEmptyComponent={
            listEstablishment.length == 0 ? (
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
