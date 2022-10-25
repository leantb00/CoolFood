import * as css from "./styles";
import { View, TouchableOpacity, Image, Text } from "react-native";
import React from 'react'
import { Avatar } from "@rneui/themed";


export function Card({item, onPress}: any){
    return(
        <View style={css.styles.listItem}>
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
              {item.image_url && <Avatar
                  size={95}
                  imageProps={{ resizeMode: "contain" }}
                  source={{
                            uri: item.image_url,
                          }}
                  // source={
                  //   !item.image
                  //     ? require("../../../assets/image/logo_drawe3.png")
                  //     : {
                  //         uri: item.image,
                  //       }
                  // }
                  // onPress={() => console.log('Works! == Funfa!!!')}
                  // activeOpacity={0.7}
                />}
              <View style={css.styles.listItemContainer}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode={"tail"}
                  style={css.styles.listItemTitle}
                >
                  {item.name || item.title}
                </Text>
                <Text
                  numberOfLines={4}
                  ellipsizeMode={"tail"}
                  style={css.styles.listItemText}
                >
                  {item.description}
                </Text>
                <Text
                  numberOfLines={4}
                  ellipsizeMode={"tail"}
                  style={css.styles.listItemText}
                >
                  {typeof item.address == "string" ? item.address : item.address.city + ' - ' + item.address.state}
                </Text>
                
              
                <View style={{ flex: 1, justifyContent: "flex-end" }}>
                
                  {!item.phone ? null : (
                    <Text
                      numberOfLines={1}
                      ellipsizeMode={"tail"}
                      style={css.styles.listItemDate}
                    >
                      {item.phone}
                    </Text>
                  )}
                </View>
              </View>
            </TouchableOpacity>
        </View>
    )
}