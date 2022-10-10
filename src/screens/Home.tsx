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


export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const { isDarkmode, setTheme } = useTheme();
  const [listEstablishment, setListEstablishment] = useState<any>([])
  const [searchText, setSearchText] = useState('')
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
  }, [])

  async function getEstablishments(){
    setRefreshing(true)
    try{
      const response = await establishment.getEstablishments()
      setRefreshing(false)
      // console.log('response || ', response)
      if(response){
        setListEstablishment(response.data)
      }
    }catch(e){
      if(e instanceof AxiosError){
        setRefreshing(false)
        showMessage({
          message: e.response ? e.response.data.msg : 'Nao deu Listar os Estabelecimentos, Verifique sua conexao',
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
              onPress={() => {}}
              key={index}
            />
          )}
          onRefresh={() => onPullToRefresh()}
          refreshing={refreshing}
          ListEmptyComponent={
            listEstablishment.length == 0 ? (
              <View style={{ marginTop: 10 }}>
                <Text>
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
                  // InputComponent={
                  //   () => {
                  //   return <TextInput
                  //     onChangeText={(text:any) => {
                  //       setSearchText(text)
                  //       console.log("alterando Texto")
                  //     }}
                  //     // onSubmitEditing={() => {
                  //     //   programSearch(searchText);
                  //     // }}
                  //     value={searchText}
                  //     placeholder={'Busca'}
                  //     // autoCapitalize={"none"}
                  //     // underlineColorAndroid="transparent"
                  //     style={{width:'100%'}}
                  //   />}
                  // }

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
