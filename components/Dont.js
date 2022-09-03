import { StyleSheet, Text, View, Linking } from 'react-native'
import React from 'react'

export default function Dont() {
  return (
    <View style={styles.account}>
      <Text style={styles.acc}>
      Não tem uma conta? 
             &nbsp;
        <Text
          style={[styles.acc, styles.link]}
          onPress={() => Linking.openURL("#")}
        >
          Cadastre-se
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  account: {
    alignItems: "center",
    marginTop: 20,
    fontSize: 18,
  },
  acc: {
    fontWeight: "bold",
    },
    link: {
        color: "yellowgreen",
    }
});