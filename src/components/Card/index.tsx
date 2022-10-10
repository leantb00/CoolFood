import * as css from "./styles";
import { View, TouchableOpacity, Image, Text } from "react-native";
import React from 'react'
import { Avatar } from "@rneui/themed";


export function Card({item,key, onPress}: any){
    return(
        <View style={css.styles.listItem} key={key}>
            <TouchableOpacity
              style={css.styles.listItemblock}
              onPress={onPress}
            >
              {/* {item.is_banner ? null : (
                <Avatar
                  size={95}
                  imageProps={{ resizeMode: "contain" }}
                  // source={require('../../assets/image/default-img.gif')}
                  source={
                    // !item.image
                    //   ? require("../../../assets/image/logo_drawe3.png")
                    //   : {
                    //       uri: item.image,
                    //     }
                  }
                  // onPress={() => console.log('Works! == Funfa!!!')}
                  // activeOpacity={0.7}
                />
              )} */}
              <Avatar
                  size={95}
                  imageProps={{ resizeMode: "contain" }}
                  source={require('../../../assets/icon.png')}
                  // source={
                  //   !item.image
                  //     ? require("../../../assets/image/logo_drawe3.png")
                  //     : {
                  //         uri: item.image,
                  //       }
                  // }
                  // onPress={() => console.log('Works! == Funfa!!!')}
                  // activeOpacity={0.7}
                />
              <View style={css.styles.listItemContainer}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={"tail"}
                  style={css.styles.listItemTitle}
                >
                  {item.title}
                </Text>
                {!item.content ? (
                  <Text
                    numberOfLines={4}
                    ellipsizeMode={"tail"}
                    style={css.styles.listItemText}
                  >
                    {item.description}
                  </Text>
                ) : (
                  <Text
                    numberOfLines={4}
                    ellipsizeMode={"tail"}
                    style={css.styles.listItemText}
                  >
                    {item.content}
                  </Text>
                )}
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                
                  {!item.date ? null : (
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={"tail"}
                      style={css.styles.listItemDate}
                    >
                      {item.date}
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
        </View>
    )
}