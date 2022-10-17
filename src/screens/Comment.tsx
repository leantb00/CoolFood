import React, {useState} from 'react';
import { Text } from '@rneui/themed';
import { TextInput, View, TouchableOpacity } from 'react-native';
import { Avatar } from "@rneui/themed";
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Comment(props:any){
    const [comment, setComment] = useState('')
    const [liked, setLiked] = useState<any>(null)
    return(
        <SafeAreaView style={{flex:1,justifyContent:'center'}}>

            <Text h2>Escreva seu Comentario sobre o Estabelecimento</Text>
            <View style={{flex:1, width:'100%', alignItems:'center'}}>
                <View style={{height:120,width:'80%', borderColor:'black', borderWidth:.3, borderRadius:20}}>
                    <TextInput
                    // containerStyle={{ marginTop: 15 }}
                        placeholder="Comentario"
                        value={comment}
                        style={{width:'100%', height:'100%', margin:5}}
                        
                        autoCapitalize="none"
                        autoComplete='off'
                        autoCorrect={false}
                        // ={{width:'80%', }}
                        multiline
                        numberOfLines={3}
                        onChangeText={(text) => setComment(text)}
                    />
                </View>
                <View style={{flex:1, flexDirection:'row'}}>
                    <Avatar
                        size={64}
                        rounded
                        onPress={() => setLiked(true)}
                        icon={{ name: 'thumbs-up', type: 'font-awesome' }}
                        containerStyle={{ backgroundColor: liked ? 'green' : 'gray' }}
                    />
                    <Avatar
                        size={64}
                        rounded
                        onPress={() => setLiked(false)}
                        icon={{ name: 'thumbs-down', type: 'font-awesome' }}
                        containerStyle={{ backgroundColor: !liked ? liked != null ? 'red' : 'gray' : 'gray' }}
                    />
                </View>
                <View style={{flex:1,justifyContent:'flex-start', width:'80%'}}>
                    <TouchableOpacity
                        style={{height:60, backgroundColor:'blue', borderRadius:120, alignItems:'center', justifyContent:'center'}}
                        onPress={() => {
                        // navigation.navigate("Register");
                        }}
                    >
                        <Text style={{ color: "white", fontWeight:'bold', fontSize:16 }}>Enviar</Text>
                    </TouchableOpacity>
                </View>
                
            </View>
        </SafeAreaView>
    )

}