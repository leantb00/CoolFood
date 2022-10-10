import React, { useState } from "react";
import { View, Linking, FlatList, TouchableOpacity, TextInput } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { supabase } from "../initSupabase";
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

import { Input, Icon } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import { Card }  from "../components/Card";

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const { isDarkmode, setTheme } = useTheme();
  const [listEstablishment, setListEstablishment] = useState([{
    title:'Felix Estabelecimento',
    description:'sadaiosda',
    content:'sadasdas',
    date:'20/12/22'


  }])
  const [searchText, setSearchText] = useState('')
  const [refreshing, setRefreshing] = useState(false)
  function onPullToRefresh(){}

  function programSearch(text:any){}

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
                        _.debounce(
                          programSearch(searchText),
                          500
                        );
                      }}
                      color="#BA4458"
                    />
                  }
                  InputComponent={
                  () => <TextInput
                    onChangeText={(text:any) => {
                      setSearchText(text)
                      // this.setState({ searchText: text });
                    }}
                    onSubmitEditing={() => {
                      programSearch(searchText);
                    }}
                    value={searchText}
                    placeholder={'Busca'}
                    autoCapitalize={"none"}
                    underlineColorAndroid="transparent"
                    
                  />}
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
