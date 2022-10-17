import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    gridContainer: {
        width: 220,
    },
    rowStyle: {
      flexDirection: "row",
    //   alignItems: "center",
    //   justifyContent: "space-around",
    },
    cellStyle: {
      flex: 1,
      margin: 4,
    },
  });
function Cell({ data }:any) {
    return (
      <View style={styles.cellStyle}>
        <Text>{data}</Text>
      </View>
    );
}
function Row({ column }:any) {  
    return (
        <View style={styles.rowStyle}>
        {column.map((data:any) => (
            <Cell data={data} />
        ))}
        </View>
    );
}

export {
    Cell,
    Row
}