import { StyleSheet, View, Image } from 'react-native'

export default function Logo() {
  return (
    <View style={styles.img}>
      <Image
        source={require("../assets/logoCoolFood.png")}
        style={{ width: 380, height:200 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  img: {
    paddingTop: 60,
    justifyContent: "center",
    alignItems: "center",    
  },
});