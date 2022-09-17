import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function Welcome() {
  return (
    <View>
      <Text style={styles.welcome}>Bem vindo ao Coolfood</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 25,
    textAlign: 'center',
    margin: 7,
    fontWeight: 'bold',
    color:"#ffa500",
    opacity: 0.7
  }
})