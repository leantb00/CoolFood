import React, { useState, useEffect } from "react";
import { View, Linking, FlatList, TouchableOpacity, TextInput } from "react-native";
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
import { Input, Icon } from "@rneui/themed";
import { showMessage, hideMessage } from "react-native-flash-message";
import { Card }  from "../components/Card";
import { AxiosError } from "axios";
import * as Location from 'expo-location';


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

  function programSearch(text:any){
    const newList = listEstablishment.filter((item:any) => item.name.includes(text))
    setListEstablishment(newList)
  }


  useEffect(() => {
    getEstablishments()
  }, [location])

  useEffect(() => {
    (async () => {
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
    })();
    getEstablishments()
  }, []);

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
      {/* <TopNav
        middleContent="Home"
        rightContent={
          <Ionicons
            name={isDarkmode ? "sunny" : "moon"}
            size={20}
            color={isDarkmode ? themeColor.white100 : themeColor.dark}
          />
        }
        rightAction={() => {
          if (isDarkmode) {
            setTheme("light");
          } else {
            setTheme("dark");
          }
        }}
      /> */}
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
                      color="#BA4458"
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
                    color: "#da332e",
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
