import React, {useContext} from "react";
import { View } from "react-native";
import { MainStackParamList } from "../types/navigation";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Layout, Text } from "react-native-rapi-ui";
import Storage from "../utils/Storage";
import { AuthContext } from "../provider/AuthProvider";

export default function ({
  navigation,
}: NativeStackScreenProps<MainStackParamList, "MainTabs">) {
  const authCont = useContext(AuthContext);
  function exit(){
    Storage.setToken('')
    authCont.setUser(false)
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
        <Text>This is the Profile tab</Text>
        <Text onPress={() => exit()} style={{color:'red'}}>Click here to Exit</Text>
      </View>
    </Layout>
  );
}
